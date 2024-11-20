import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { asyncHandler, generateUniqueSlug, updateExistingSlug } from '../utils';
import { SortBy, SortByOrder, Tag } from '../types/ArticleTypes';
import { AuthenticatedUser } from '../types/UserTypes';

const prisma = new PrismaClient();

const getAllArticle = asyncHandler(async (req: Request, res: Response) => {
    const {
        sort_by = 'createdAt',
        order = 'desc',
        tags,
        authors,
    } = req.query as {
        sort_by: SortBy;
        order: SortByOrder;
        tags?: string | string[];
        authors?: string | string[];
    };

    let tagsData: string[] | undefined = [];
    let authorsData: string[] | undefined = [];

    if (tags) {
        if (Array.isArray(tags)) {
            tagsData = [...tags];
        } else {
            tagsData = [tags];
        }
    } else {
        tagsData = undefined;
    }

    if (authors) {
        if (Array.isArray(authors)) {
            authorsData = [...authors];
        } else {
            authorsData = [authors];
        }
    } else {
        authorsData = undefined;
    }

    const articles = await prisma.article.findMany({
        orderBy: { [sort_by]: order },
        where: {
            tags: { some: { name: { in: tagsData } } },
            author: { username: { in: authorsData } },
        },
        include: {
            tags: { select: { name: true } },
            author: { select: { username: true, name: true } },
        },
    });

    res.status(200).json({
        success: true,
        code: 200,
        message: 'List of Articles',
        data: articles,
    });
});

const getArticle = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'Article not found',
        });
        return;
    }

    res.status(200).json({
        success: true,
        code: 200,
        message: 'Article',
        data: article,
    });
});

const getUserArticleFeed = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req.body;
    const { user_id } = user;

    const feed = await prisma.article.findMany({
        where: { author: { Following: { some: { followedById: user_id } } } },
    });

    res.status(200).json({
        success: true,
        code: 200,
        message: 'Feed',
        data: feed,
    });
});

const createArticle = asyncHandler(async (req: Request, res: Response) => {
    const { slug, title, subtitle, body, tags, user } = req.body as {
        slug: string;
        title: string;
        subtitle: string;
        body: string;
        tags: Tag[];
        user: AuthenticatedUser;
    };

    const uniqueSlug = await generateUniqueSlug(slug);

    const tagsData: Tag[] = [];
    for (let i = 0; i < tags.length; i++) {
        if (i < 5) {
            tagsData.push({ name: tags[i].name });
        }
    }

    const tagsToConnect: { id: number }[] = [];
    for (const tag of tagsData) {
        try {
            const tagRecord = await prisma.tag.upsert({
                where: { name: tag.name },
                create: { name: tag.name },
                update: {},
                select: { id: true },
            });
            tagsToConnect.push(tagRecord);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                const existingTag = await prisma.tag.findUnique({
                    where: { name: tag.name },
                    select: { id: true },
                });
                if (existingTag) {
                    tagsToConnect.push(existingTag);
                }
            }
        }
    }

    const newArticle = await prisma.article.create({
        data: {
            title,
            subtitle,
            body,
            slug: uniqueSlug,
            authorId: user.user_id,
            tags: { connect: tagsToConnect },
        },
        include: { tags: true },
    });

    res.status(201).json({
        success: true,
        code: 201,
        message: 'Article added successfully',
        data: newArticle,
    });
});

const updateArticle = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const {
        slug: newSlug,
        title,
        subtitle,
        body,
        tags,
        user,
    } = req.body as {
        slug: string;
        title: string;
        subtitle: string;
        body: string;
        tags: Tag[];
        user: AuthenticatedUser;
    };

    const existingArticle = await prisma.article.findUnique({
        where: { slug },
    });
    if (!existingArticle) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'Article not found',
        });
        return;
    }

    if (user.user_id !== existingArticle.authorId) {
        res.status(403).json({
            success: false,
            code: 403,
            message: 'Forbidden (not the author)',
        });
        return;
    }

    let updatedSlugWithId: string | undefined;
    if (newSlug) {
        updatedSlugWithId = updateExistingSlug(slug, newSlug);
    }

    const tagsData: Tag[] = [];
    for (let i = 0; i < tags.length; i++) {
        if (i < 5) {
            tagsData.push({ name: tags[i].name });
        }
    }

    const existingTags = await prisma.tag.findMany({
        where: {
            article: {
                some: { id: existingArticle.id },
            },
        },
        select: { id: true, name: true },
    });

    const tagsToCreate: Tag[] = tagsData.filter(
        (tag) =>
            !existingTags.some((existingTag) => existingTag.name === tag.name)
    );
    const tagsToConnect: { id: number }[] = await Promise.all(
        tagsToCreate.map((tag) =>
            prisma.tag.upsert({
                where: { name: tag.name },
                create: { name: tag.name },
                update: {},
                select: { id: true },
            })
        )
    );
    const tagsToDelete: Tag[] = existingTags.filter(
        (existingTag) => !tagsData.some((tag) => tag.name === existingTag.name)
    );

    const updatedArticle = await prisma.article.update({
        where: { slug },
        data: {
            slug: updatedSlugWithId,
            title,
            subtitle,
            body,
            tags: {
                connect: tagsToConnect,
                disconnect: tagsToDelete.map((tag) => ({ id: tag.id })),
            },
        },
        include: { tags: true },
    });

    res.status(202).json({
        success: true,
        code: 202,
        message: 'Article updated successfully',
        data: updatedArticle,
    });
});

const deleteArticle = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req.body;
    const { slug } = req.params;

    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'Article not found',
        });
        return;
    }

    if (article?.authorId !== user.user_id) {
        res.status(403).json({
            success: false,
            code: 403,
            message: 'Forbidden (not the author)',
        });
        return;
    }

    await prisma.article.delete({ where: { slug } });

    res.status(202).json({
        success: true,
        code: 202,
        message: 'Article deleted successfully',
    });
});

const favouriteArticle = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req.body;

    const { user_id } = user;
    const { slug } = req.params;

    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'Article not found',
        });
        return;
    }

    await prisma.userLikesArticle.create({
        data: { userId: user_id, articleId: article.id },
    });

    res.status(202).json({
        success: true,
        code: 202,
        message: 'Article Favourited',
    });
});

const unfavouriteArticle = asyncHandler(async (req: Request, res: Response) => {
    const { user } = req.body;

    const { user_id } = user;
    const { slug } = req.params;

    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'Article not found',
        });
        return;
    }

    await prisma.userLikesArticle.delete({
        where: {
            userId_articleId: { userId: user_id, articleId: article.id },
        },
    });

    res.status(202).json({
        success: true,
        code: 202,
        message: 'Article Unfavourited',
    });
});

export {
    getArticle,
    getAllArticle,
    getUserArticleFeed,
    createArticle,
    updateArticle,
    deleteArticle,
    favouriteArticle,
    unfavouriteArticle,
};

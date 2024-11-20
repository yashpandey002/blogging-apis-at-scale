import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils';

const prisma = new PrismaClient();

const getAllCommentsOfArticle = asyncHandler(
    async (req: Request, res: Response) => {
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

        const comments = await prisma.comment.findMany({
            where: { articleId: article.id },
        });

        res.status(200).json({
            success: true,
            code: 200,
            message: 'List of comments',
            data: comments,
        });
    }
);

const createCommentForArtcile = asyncHandler(
    async (req: Request, res: Response) => {
        const { user, comment } = req.body;

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

        const commentCreated = await prisma.comment.create({
            data: { authorId: user_id, articleId: article.id, body: comment },
        });

        res.status(201).json({
            success: true,
            code: 201,
            message: 'Comment Created',
            data: commentCreated,
        });
    }
);

const deleteCommentOfArticle = asyncHandler(
    async (req: Request, res: Response) => {
        const { user, id } = req.body;
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

        const comment = await prisma.comment.findUnique({ where: { id: id } });
        if (!comment) {
            res.status(404).json({
                success: false,
                code: 404,
                message: 'Comment not found',
            });
            return;
        }

        if (comment.authorId != user_id) {
            res.status(403).json({
                success: false,
                code: 403,
                message: 'Forbidden (not the author)',
            });
            return;
        }

        await prisma.comment.delete({ where: { id: id } });

        res.status(202).json({
            success: true,
            code: 202,
            message: 'Comment Deleted',
        });
    }
);

export {
    getAllCommentsOfArticle,
    createCommentForArtcile,
    deleteCommentOfArticle,
};

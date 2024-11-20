import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validateCreateArticle = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { slug, title, subtitle, body, tags } = req.body;

    const schema = z.object({
        slug: z.string().min(10).max(200),
        title: z.string().min(10).max(100),
        subtitle: z.string().min(10).max(150),
        body: z.string().min(50).max(100000),
        tags: z
            .array(z.object({ name: z.string().min(1) }))
            .nonempty('At least one tag is required'),
    });

    const { success, error } = schema.safeParse({
        slug,
        title,
        subtitle,
        body,
        tags,
    });

    if (!success) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Bad request',
            errors: error.errors,
        });
        console.log('Errors: ', error.errors);

        return;
    }

    next();
};

const validateGetAllArticles = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { sort_by, order, tags, authors } = req.query;

    const schema = z.object({
        sort_by: z.enum(['createdAt', 'likes']).default('createdAt'),
        order: z.enum(['asc', 'desc']).default('desc'),
        tags: z.union([z.string(), z.array(z.string())]).optional(),
        authors: z.union([z.string(), z.array(z.string())]).optional(),
    });

    const { success, error } = schema.safeParse({
        sort_by,
        order,
        tags,
        authors,
    });

    if (!success) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Bad request',
            errors: error.errors,
        });
        console.log('Errors: ', error.errors);

        return;
    }

    next();
};

const validateUpdateArticle = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { slug, title, subtitle, body } = req.body;

    const schema = z.object({
        slug: z.string().min(10).max(200).optional(),
        title: z.string().min(10).max(100).optional(),
        subtitle: z.string().min(10).max(150).optional(),
        body: z.string().min(50).max(100000).optional(),
        tags: z.array(z.object({ name: z.string().min(1) })).optional(),
    });

    const { success, error } = schema.safeParse({
        slug,
        title,
        subtitle,
        body,
    });

    if (!success) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Bad request',
            errors: error.errors,
        });
        console.log('Errors: ', error.errors);

        return;
    }

    next();
};

const validateArticleSlug = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { slug } = req.params;

    const schema = z.object({
        slug: z.string().min(10).max(200),
    });

    const { success, error } = schema.safeParse({
        slug,
    });

    if (!success) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Bad request',
            errors: error.errors,
        });
        console.log('Errors: ', error.errors);

        return;
    }

    next();
};

export {
    validateCreateArticle,
    validateGetAllArticles,
    validateUpdateArticle,
    validateArticleSlug,
};

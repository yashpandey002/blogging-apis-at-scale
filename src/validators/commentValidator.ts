import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validateCreateCommentForArticle = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { comment } = req.body;
    const { slug } = req.params;

    const schema = z.object({
        comment: z.string().min(1),
        slug: z.string().min(10).max(200),
    });

    const { success, error } = schema.safeParse({ comment, slug });

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

const validateDeleteCommentOfArticle = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.body;
    const { slug } = req.params;

    const schema = z.object({
        id: z.number(),
        slug: z.string().min(10).max(200),
    });

    const { success, error } = schema.safeParse({ id, slug });

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

export { validateCreateCommentForArticle, validateDeleteCommentOfArticle };

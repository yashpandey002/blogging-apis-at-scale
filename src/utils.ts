import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        code: 500,
        message: 'Internal Server Error',
    });
}

function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

function createJsonToken(user: { id: string }) {
    const payload = { user_id: user.id };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(payload, secret, {
        expiresIn: '1h',
    });

    return token;
}

async function generateUniqueSlug(userSlug: string): Promise<string> {
    const { nanoid } = await import('nanoid');
    return `${userSlug}-ID${nanoid()}`;
}

function updateExistingSlug(existingSlug: string, newSlug: string): string {
    const slugId = existingSlug.split('-ID')[1];
    return `${newSlug}-ID${slugId}`;
}

export {
    errorHandler,
    asyncHandler,
    createJsonToken,
    generateUniqueSlug,
    updateExistingSlug,
};

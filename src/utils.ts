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

export { errorHandler, asyncHandler, createJsonToken };

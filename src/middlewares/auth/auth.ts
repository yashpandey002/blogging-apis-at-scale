import { asyncHandler } from '../../utils';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    user_id: string;
}

const authenticateUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({
                success: false,
                code: 401,
                message: 'Unauthorized',
            });
            return;
        }
        const token = authorization.split(' ')[1];

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err || !decoded) {
                res.status(403).json({
                    success: false,
                    code: 403,
                    message: 'Invalid or expired token',
                });
                return;
            }

            const decodedPayload = decoded as CustomJwtPayload;

            req.body.user = {
                user_id: Number(decodedPayload.user_id),
                exp: decodedPayload.exp,
                iat: decodedPayload.iat,
            };

            next();
        });
    }
);

export { authenticateUser };

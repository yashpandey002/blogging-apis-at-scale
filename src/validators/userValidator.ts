import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validateUserRegistration = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { email, password, name, bio, profileImg } = req.body;

    const userRegistrationSchema = z.object({
        email: z.string().email('Email is required'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .regex(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
            )
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
            ),
        name: z.string().optional(),
        bio: z.string().optional(),
        profileImg: z.string().optional(),
    });

    const { success, error } = userRegistrationSchema.safeParse({
        email,
        password,
        name,
        bio,
        profileImg,
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

const validateUserLogin = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { email, password } = req.body;

    const userLoginSchema = z.object({
        email: z.string().email('Email is required'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .regex(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
            )
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
            ),
    });

    const { success, error } = userLoginSchema.safeParse({ email, password });

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

const validateUserProfileUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { username } = req.params;
    const { name, bio, profileImg } = req.body;

    const userProfileUpdateSchema = z.object({
        username: z.string({ message: 'Username is required' }),
        name: z.string().optional(),
        bio: z.string().optional(),
        profileImg: z.string().optional(),
    });

    const { success, error } = userProfileUpdateSchema.safeParse({
        username,
        name,
        bio,
        profileImg,
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
    validateUserRegistration,
    validateUserLogin,
    validateUserProfileUpdate,
};

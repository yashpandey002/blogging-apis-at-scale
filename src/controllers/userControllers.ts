import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { asyncHandler, createJsonToken } from '../utils';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, bio, profileImg } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        res.status(409).json({
            success: false,
            code: 409,
            message: 'User already exists',
        });
        return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const [username] = email.split('@');

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashPassword,
            name: name || null,
            bio: bio || null,
            profileImg: profileImg || null,
        },
    });

    const userToken = createJsonToken({ id: String(newUser.id) });

    res.set('Authorization', userToken);
    res.status(201).json({
        success: true,
        code: 201,
        message: 'User registered successfully',
        data: {
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            bio: newUser.bio,
            profileImg: newUser.profileImg,
        },
    });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'No user found with this email',
        });
        return;
    }

    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) {
        res.status(401).json({
            success: false,
            code: 401,
            message: 'Wrong password',
        });
        return;
    }

    const userToken = createJsonToken({ id: String(user.id) });

    res.set('Authorization', userToken);
    res.status(200).json({
        success: true,
        code: 200,
        message: 'User logged in successfully',
        data: {
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImg: user.profileImg,
        },
    });
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'No user found with this username',
        });
        return;
    }

    res.status(200).json({
        success: true,
        code: 200,
        message: 'User Profile',
        data: {
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImg: user.profileImg,
        },
    });
});

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const { user } = req.body;
    const { user_id } = user;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (!existingUser) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'No user found with this username',
        });
        return;
    }

    if (existingUser.id !== user_id) {
        res.status(403).json({
            success: false,
            code: 403,
            message: "You can't update other user's profile",
        });
        return;
    }

    const { name, bio, profileImg } = req.body;

    const updatedUser = await prisma.user.update({
        where: { username },
        data: { name, bio, profileImg },
    });

    res.status(201).json({
        success: true,
        code: 201,
        message: 'User profile updated successfully',
        data: {
            name: updatedUser.name,
            bio: updatedUser.bio,
            profileImg: updatedUser.profileImg,
        },
    });
});

const followUser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const { user } = req.body;
    const { user_id: followedById } = user;

    if (!username) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Username required',
        });
        return;
    }

    const followedByUser = await prisma.user.findUnique({
        where: { id: Number(followedById) },
    });
    if (!followedByUser) {
        res.status(401).json({
            success: false,
            code: 401,
            message: 'Unauthorized',
        });
        return;
    }

    const followingUser = await prisma.user.findUnique({ where: { username } });
    if (!followingUser) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'User Not Found',
        });
        return;
    }

    if (followedByUser.id === followingUser.id) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'You cannot follow yourself.',
        });
        return;
    }

    const follows = await prisma.follows.upsert({
        where: {
            followedById_followingId: {
                followedById: followedByUser.id,
                followingId: followingUser.id,
            },
        },
        create: {
            followedById: followedByUser.id,
            followingId: followingUser.id,
        },
        update: {},
    });

    res.status(200).json({
        success: true,
        code: 200,
        message: 'User Followed',
        data: {
            ...follows,
        },
    });
});

const unFollowUser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const { user } = req.body;
    const { user_id: followedById } = user;

    if (!username) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Username required',
        });
        return;
    }

    const followedByUser = await prisma.user.findUnique({
        where: { id: Number(followedById) },
    });
    if (!followedByUser) {
        res.status(401).json({
            success: false,
            code: 401,
            message: 'Unauthorized',
        });
        return;
    }

    const followingUser = await prisma.user.findUnique({ where: { username } });
    if (!followingUser) {
        res.status(404).json({
            success: false,
            code: 404,
            message: 'User Not Found',
        });
        return;
    }

    if (followedByUser.id === followingUser.id) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'You cannot unfollow yourself.',
        });
        return;
    }

    const unfollow = await prisma.follows.delete({
        where: {
            followedById_followingId: {
                followedById: followedByUser.id,
                followingId: followingUser.id,
            },
        },
    });

    res.status(200).json({
        success: true,
        code: 200,
        message: 'User Unfollowed',
        data: {
            ...unfollow,
        },
    });
});

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({});

    res.status(201).json({
        success: true,
        code: 200,
        message: 'Users fetched successfully',
        data: { users },
    });
});

export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    followUser,
    unFollowUser,
    getAllUsers,
};

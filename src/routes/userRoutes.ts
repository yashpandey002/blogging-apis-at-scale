import { Router } from 'express';
import {
    validateUserRegistration,
    validateUserLogin,
    validateUserProfileUpdate,
} from '../validators/userValidator';
import {
    registerUser,
    loginUser,
    getUserProfile,
    followUser,
    unFollowUser,
    updateUserProfile,
    getAllUsers,
} from '../controllers/userControllers';
import { authenticateUser } from '../middlewares/auth/auth';

const router = Router();

router.get('/all', getAllUsers);
router.post('/', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);
router.put(
    '/:username',
    authenticateUser,
    validateUserProfileUpdate,
    updateUserProfile
);
router.get('/:username', getUserProfile);
router.put('/:username/follow', authenticateUser, followUser);
router.delete('/:username/follow', authenticateUser, unFollowUser);

export default router;

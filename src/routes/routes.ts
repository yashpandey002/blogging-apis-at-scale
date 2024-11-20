import { Router } from 'express';
import userRoutes from './userRoutes';
import articleRoutes from './articleRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

export default router;

import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth/auth';
import {
    getArticle,
    getAllArticle,
    getUserArticleFeed,
    createArticle,
    updateArticle,
    deleteArticle,
    favouriteArticle,
    unfavouriteArticle,
} from '../controllers/articleControllers';
import {
    createCommentForArtcile,
    getAllCommentsOfArticle,
    deleteCommentOfArticle,
} from '../controllers/commentControllers';
import {
    validateCreateArticle,
    validateGetAllArticles,
    validateUpdateArticle,
    validateArticleSlug,
} from '../validators/articleValidator';
import {
    validateCreateCommentForArticle,
    validateDeleteCommentOfArticle,
} from '../validators/commentValidator';

const router = Router();

router.get('/', validateGetAllArticles, getAllArticle);
router.get('/feed', authenticateUser, getUserArticleFeed);
router.get('/:slug', validateArticleSlug, getArticle);
router.post('/', authenticateUser, validateCreateArticle, createArticle);
router.patch('/:slug', authenticateUser, validateUpdateArticle, updateArticle);
router.delete('/:slug', authenticateUser, validateArticleSlug, deleteArticle);
router.put(
    '/:slug/like',
    authenticateUser,
    validateArticleSlug,
    favouriteArticle
);
router.delete(
    '/:slug/like',
    authenticateUser,
    validateArticleSlug,
    unfavouriteArticle
);
router.get('/:slug/comment', validateArticleSlug, getAllCommentsOfArticle);
router.post(
    '/:slug/comment',
    authenticateUser,
    validateCreateCommentForArticle,
    createCommentForArtcile
);
router.delete(
    '/:slug/comment',
    authenticateUser,
    validateDeleteCommentOfArticle,
    deleteCommentOfArticle
);

export default router;

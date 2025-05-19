import { Router } from 'express';
import UserController from '../controllers/user.controller';
import SessionMiddleware from '../middlewares/session.middleware';

const router = Router();

// Obtener perfil del usuario autenticado
router.get('/me', SessionMiddleware.authenticate, UserController.me);

export default router;
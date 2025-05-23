import { Router } from 'express';
import { me } from '../controllers/user.controller';
import { authenticate } from '../middlewares/session.middleware';

const router = Router();

// Obtener perfil del usuario autenticado
router.get('/me', authenticate, me);

export default router;
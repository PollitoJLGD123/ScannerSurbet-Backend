import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import SessionMiddleware from '../middlewares/session.middleware';

const router = Router();

router.post('/login', 
  AuthMiddleware.validateLogin, 
  AuthController.login
);

router.post('/register', 
  AuthMiddleware.validateRegister, 
  AuthController.register
);

router.post('/change-password', 
  SessionMiddleware.authenticate,
  AuthMiddleware.validateChangePassword, 
  AuthController.changePassword
);

export default router;
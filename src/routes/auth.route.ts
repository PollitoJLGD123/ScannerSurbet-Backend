import { Router } from 'express';
import { login, register, changePassword, logout } from '../controllers/auth.controller';
import * as authMiddleware from '../middlewares/auth.middleware';
import { authenticate } from '../middlewares/session.middleware';

const router = Router();

router.post('/login', 
  authMiddleware.validateLogin, 
  login
);

router.post('/register', 
  authMiddleware.validateRegister, 
  register
);

router.post('/change-password', 
  authenticate,
  authMiddleware.validateChangePassword, 
  changePassword
);

router.post('/logout', 
  authenticate,
  logout
);

export default router;
import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Success!!!',
    version: '1.0'
  });
});

export default router;
import { Router, Request, Response } from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import surebetRouter from './surebet.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/surebet', surebetRouter);

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Success!!!',
    version: '1.0'
  });
});

export default router;
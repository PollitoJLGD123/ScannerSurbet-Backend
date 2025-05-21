import { Router } from 'express';
import { StopSurbet } from '../controllers/surbet.controller';

const router = Router();

router.post('/surebets-stop/:type', StopSurbet);

export default router;
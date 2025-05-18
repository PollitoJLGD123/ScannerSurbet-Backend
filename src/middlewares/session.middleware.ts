import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';

class SessionMiddleware {
  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ 
          success: false,
          message: 'Se requiere token de autenticación' 
        });
        return;
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      
      if (!decoded) {
        res.status(401).json({ 
          success: false,
          message: 'Token inválido o expirado' 
        });
        return;
      }
      
      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ 
        success: false,
        message: 'Error de autenticación' 
      });
      return;
    }
  }
}

export default new SessionMiddleware();
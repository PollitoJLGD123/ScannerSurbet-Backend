import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';

class SessionMiddleware {
  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false,
          message: 'Se requiere token de autenticación' 
        });
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      
      if (!decoded) {
        return res.status(401).json({ 
          success: false,
          message: 'Token inválido o expirado' 
        });
      }
      
      (req as any).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false,
        message: 'Error de autenticación' 
      });
    }
  }
}

export default new SessionMiddleware();
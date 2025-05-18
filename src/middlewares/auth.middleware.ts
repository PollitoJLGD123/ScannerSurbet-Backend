import { Request, Response, NextFunction } from 'express';
import { loginSchema, registerSchema, changePasswordSchema } from '../validators/auth.validator';

class AuthMiddleware {
  validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ 
        success: false,
        message: error.details[0].message 
      });
      return;
    }
    
    next();
  }
  
  validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ 
        success: false,
        message: error.details[0].message 
      });
      return;
    }
    
    next();
  }
  
  validateChangePassword = (req: Request, res: Response, next: NextFunction) => {
    const { error } = changePasswordSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ 
        success: false,
        message: error.details[0].message 
      });
      return;
    }
    
    next();
  }
}

export default new AuthMiddleware();
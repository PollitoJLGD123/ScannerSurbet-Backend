import { Request, Response, NextFunction } from 'express';
import { loginSchema, registerSchema, changePasswordSchema } from '../validators/auth.validator';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
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
  
const validateRegister = (req: Request, res: Response, next: NextFunction) => {
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
  
const validateChangePassword = (req: Request, res: Response, next: NextFunction) => {
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

export { validateLogin, validateRegister, validateChangePassword };
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { ILoginRequest, IRegisterRequest, IChangePasswordRequest } from '../types/auth.type';

class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const loginData = req.body as ILoginRequest;
      const result = await AuthService.login(loginData);
      
      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: result
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }
  
  register = async (req: Request, res: Response) => {
    try {
      const registerData = req.body as IRegisterRequest;
      const result = await AuthService.register(registerData);
      
      return res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: result
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
  
  changePassword = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no autenticado'
        });
      }
      
      const passwordData = req.body as IChangePasswordRequest;
      const result = await AuthService.changePassword(user.userId, passwordData);
      
      return res.status(200).json({
        success: true,
        message: 'Contraseña actualizada correctamente',
        data: result
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default new AuthController();
import { Request, Response } from 'express';
import { User } from '../models/User.model';

class UserController {
  me = async (req: Request, res: Response) => {
    try {
      const tokenUser = (req as any).user;
      
      const dbUser = await User.findByPk(tokenUser.userId, {
        attributes: ['id', 'nombres', 'apellidos', 'correo', 'pais', 'active']
      });
      
      if (!dbUser) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return
      }
      
      // combinar información del token con datos completos del usuario
      const userData = {
        ...tokenUser,
        nombres: dbUser.nombres,
        apellidos: dbUser.apellidos,
        correo: dbUser.correo,
        pais: dbUser.pais,
        active: dbUser.active
      };
      
      res.status(200).json({
        success: true,
        data: userData
      });
    } catch (error) {
      console.error('Error obteniendo perfil de usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener perfil de usuario'
      });
      return
    }
  }
}

export default new UserController();
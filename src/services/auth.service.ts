import { User } from '../models/User.model';
import { generateToken } from '../lib/jwt';
import { comparePassword, encryptPassword } from '../lib/encrypt';
import { ILoginRequest, IRegisterRequest, IChangePasswordRequest, UserCreationAttributes } from '../types/auth.type';

/**
 * Realiza el inicio de sesión del usuario
 */
export async function login(credentials: ILoginRequest) {
  const { correo, password } = credentials;
  
  const user = await User.findOne({ where: { correo } });
  if (!user) {
      throw new Error('Usuario no encontrado');
  }
  
  if (!user.active) {
    throw new Error('La cuenta ha sido desactivada. Contacte con soporte');
  }
  
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }
  
  const token = generateToken({ userId: user.id, email: user.correo });
  
  return {
      token,
      user: {
          id: user.id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          correo: user.correo,
          pais: user.pais
      }
  };
}

/**
 * Registra un nuevo usuario
 */
export async function register(userData: IRegisterRequest) {
  const { correo } = userData;
  
  const existingUser = await User.findOne({ where: { correo } });
  if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
  }
  
  const userToCreate = {
      nombres: userData.nombres,
      apellidos: userData.apellidos,
      correo: userData.correo,
      password: userData.password,
      pais: userData.pais,
      codPais: userData.codPais,
      celular: userData.celular
  };
  
  const user = await User.create(userToCreate);
  
  const token = generateToken({ userId: user.id, email: user.correo });
  
  return {
      token,
      user: {
          id: user.id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          correo: user.correo,
          pais: user.pais
      }
  };
}

/**
 * Cambia la contraseña del usuario
 */
export async function changePassword(userId: number, passwordData: IChangePasswordRequest) {
  const { currentPassword, newPassword } = passwordData;
  
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  const isPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('La contraseña actual es incorrecta.');
  }

  const samePassword = await comparePassword(newPassword, user.password);
  if (samePassword) {
    throw new Error('La nueva contraseña debe ser distinta de la anterior.');
  }
  
  user.password = await encryptPassword(newPassword);
  await user.save();
  
  return {
    message: 'Contraseña actualizada correctamente'
  };
}
import { Request } from 'express';
import { InferCreationAttributes } from 'sequelize';
import { User } from '../models/User.model';


export interface ILoginRequest {
  correo: string;
  password: string;
}

export interface IRegisterRequest {
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
  pais: string;
  codPais: string;
  celular: string;
}

export type UserCreationAttributes = InferCreationAttributes<User, { omit: 'id' | 'createdAt' | 'updatedAt' }>;

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export interface ChangePasswordAuthRequest extends AuthenticatedRequest {
  body: IChangePasswordRequest;
}

export interface LoginRequest extends Request {
  body: ILoginRequest;
}

export interface RegisterRequest extends Request {
  body: IRegisterRequest;
}
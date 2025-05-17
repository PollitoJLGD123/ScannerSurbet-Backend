import { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4002;
export const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your_jwt_secret';
export const JWT_EXPIRATION= process.env.JWT_EXPIRATION || '24h';

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || '3306';
export const DB_NAME = process.env.DB_NAME || 'db_scansurbet';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASS = process.env.DB_PASS || '';
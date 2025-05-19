import { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || '';
export const JWT_SECRET: Secret = process.env.JWT_SECRET || '';
export const JWT_EXPIRATION= process.env.JWT_EXPIRATION || '';

export const DB_HOST = process.env.DB_HOST || '';
export const DB_PORT = process.env.DB_PORT || '';
export const DB_NAME = process.env.DB_NAME || '';
export const DB_USER = process.env.DB_USER || '';
export const DB_PASS = process.env.DB_PASS || '';
export const SCRAPING_USER_NAME = process.env.SCRAPING_USER_NAME || '';
export const SCRAPING_USER_PASS = process.env.SCRAPING_USER_PASS || '';
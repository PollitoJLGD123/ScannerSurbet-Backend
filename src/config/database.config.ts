import { Sequelize } from 'sequelize-typescript';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './config';
import { User } from '../models/user.model';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  models: [User], 
  logging: false
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
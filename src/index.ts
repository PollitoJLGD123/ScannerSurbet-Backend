import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config/config';
import { connectDB } from './config/database.config';
import routes from './routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});


const startServer = async () => {
  try {
  
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config/config';
import { connectDB } from './config/database.config';
import routes from './routes';
import http from "http"
import { connectSocket } from './socket/socket';

const app = express();
const server = http.createServer(app);

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
    await connectSocket(server);

    server.listen(PORT, () => {
      console.log(`Server corriendo en puerto http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

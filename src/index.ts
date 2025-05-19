import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config/config';
import { connectDB } from './config/database.config';
import routes from './routes';
import http from "http"
import { startSession } from './scrap/start';

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

    server.listen(PORT, async () => {
      console.log(`Server running on port http://localhost:${PORT}`);
      await startSession(server); 
      //setupWebSocket(server, context);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

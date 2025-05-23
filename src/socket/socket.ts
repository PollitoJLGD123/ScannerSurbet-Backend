import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { WebSocketWithEvents } from '../types/socket.type';
import { Surebet } from '../types/socket.type';

let socket: WebSocketServer;
let connectedClients: WebSocket[] = [];

export const connectSocket = async (server: Server) => {
  socket = new WebSocketServer({ server });
  socket.on('connection', (ws: WebSocketWithEvents) => {
    console.log('🔌 Cliente WebSocket conectado.');
    connectedClients.push(ws);

    ws.on('close', () => {
      console.log('👋 Cliente desconectado.');
      connectedClients = connectedClients.filter((client: WebSocket) => client !== ws);
    });

    ws.on('error', (err: Error) => {
      console.error('⚠️ WebSocket error:', err.message);
    });
  });

  console.log('➡️ WebSocket iniciado');
};

export const sendData = async (data: Surebet[], type = 'live') => {
  connectedClients.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: `${type}_data`, payload: data }));
    }
  });
};

export const returnSocket = () => {
  return socket;
};

export const returnConnectedClients = () => {
  return connectedClients;
};

export const closeSocket = () => {
  socket.close();
};
import { WebSocketServer } from 'ws';
import { createPage } from "../pages/create.js";
import { Browser, BrowserContext, Page } from 'playwright';
import { sendData } from '../data/send';
import { WebSocketWithEvents } from '../../types/socket.type';
import { Server } from 'http';

let connectedClients: WebSocket[] = [];

export async function setupWebSocket(server: Server, context: BrowserContext, page_init: Page, browser: Browser) {
    try{
        if (!context || !page_init || !browser) {
            console.error('❌ No se ha inicido la pagina');
            return
        }

        const wss = new WebSocketServer({ server });

        wss.on('connection', (ws: WebSocketWithEvents) => {
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

        //const page_live = await createPage(context, 'https://www.winnarbet.com/live');
        console.log('➡️ Ingresando en la página de live...');

        const page_prematch = await createPage(context, 'https://www.winnarbet.com/prematch') || null;

        if (!page_prematch) {
            console.error('❌ No se pudo crear la página de prematch');
            return;
        }

        console.log('➡️ Ingresando en la página de prematch...');

        // scraping live y envio cada 0 segundos
        setInterval(async () => await sendData(page_init, "live", connectedClients), 0);

        // scraping prematch y envio cada 0 segundos
        setInterval(async () => await sendData(page_prematch, "prematch", connectedClients), 4000);
        
    }catch(err){
        console.error('❌ Error al prender socket o iniciar una pagina', err);
        return;
    }

}

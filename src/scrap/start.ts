import { chromium } from 'playwright';
import { createPage } from './pages/create';
import { setupWebSocket } from './tasks/websocket';
import { Server } from 'http';
import { SCRAPING_USER_NAME, SCRAPING_USER_PASS } from '../config/config';

export async function startSession(server: Server) {
    try{
        const browser = await chromium.launch({ headless: false });

        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            locale: 'es-ES',
            viewport: { width: 1280, height: 720 }
        });

        const page_init = await createPage(context, 'https://www.winnarbet.com/login');
        if (!page_init) {
            throw new Error('No se pudo crear la página de inicio de sesión.');
        }
        console.log('➡️ Iniciando sesión...');

        await page_init.fill('input[name="email"]', SCRAPING_USER_NAME);
        await page_init.fill('input[name="password"]', SCRAPING_USER_PASS);
        await page_init.click('button[type="submit"]');
        await page_init.waitForNavigation({ waitUntil: 'domcontentloaded' });

        console.log('✅ Sesión iniciada.');

        // inicializar websocket
        setupWebSocket(server, context, page_init, browser);
    }catch(err){
        console.error('❌ Error al iniciar la sesión:', err);
        return;
    }
}

import { scrapData } from "../tasks/scraper.js";
import { organizationData } from "../generator/process";
import { Page } from "playwright";

let scraping = false;

export const sendData = async (page: Page, type = 'live', connectedClients: WebSocket[]) => {
    if (scraping) return;
    scraping = true;

    try {
        const data = await scrapData(page, type);

        console.log('➡️ Datos scrapeados de ', type,  ": ", data.length);

        // validar data
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.warn("❌ Datos vacíos o inválidos");
            scraping = false;
            return;
        }

        const processedData = await organizationData(data);

        connectedClients.forEach(ws => {
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({ type: `${type}_data`, payload: processedData }));
            }
        });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('🛑 Error durante scraping:', err.message);
        } else {
            console.error('🛑 Error durante scraping:', err);
        }
    } finally {
        scraping = false;
    }
};
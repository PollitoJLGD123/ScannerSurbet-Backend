
import { BrowserContext } from 'playwright';

export async function createPage(context: BrowserContext, url: string) {

    try{
        const page = await context.newPage();

        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
            (window as any).chrome = { runtime: {} };
            Object.defineProperty(navigator, 'languages', { get: () => ['es-ES'] });
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3],
            });
        });

        await page.goto(url, { waitUntil: 'domcontentloaded' });
        return page;
    }catch(err){
        console.error('❌ Error al crear la página:', err);
        return null;
    }
}

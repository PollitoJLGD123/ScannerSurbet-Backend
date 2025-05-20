import { Page } from "playwright";
import { Surebet, SectionSurebet } from "../../types/socket.type";

export const scrapData = async (page: Page, type = 'live') => {
    try {
        let datos = await page.evaluate((scrapeType) => {
            const changeBookName = (book: string) => {
                const NameMap: { [key: string]: string } = {
                    Marathonbet: "Marathon",
                };
                return NameMap[book] || book;
            };

            const content = document.querySelector(".mt-1");
            if (!content) return [];

            const surebet: Surebet[] = [];
            const isLive = scrapeType === 'live';

            content.querySelectorAll(".panel").forEach((item) => {
                const events = item.querySelectorAll(".ng-star-inserted");
                const percent_color = getComputedStyle(item.querySelector(".col-span-2") as Element).backgroundColor ;
                const percent = (item.querySelector(".col-span-2")?.textContent?.trim() ?? null) as string;
                const middle_value = (item.querySelector("span.bg-yellow-500")?.textContent?.trim() || null) as string;
                const sportName = (item.querySelector(".col-span-7 > span.font-semibold")?.textContent?.trim() || null) as string;
                const period = (item.querySelector(".col-span-7 > span.font-normal")?.textContent?.trim() || null) as string;
                const time = (item.querySelector(".col-span-2 > p.ng-tns-c1499674981-3")?.textContent?.trim() || null) as string;

                const sections: SectionSurebet[] = [];

                events.forEach((event) => {
                    const book_name = (event.querySelector("img.h-6") as HTMLImageElement | null)?.alt || null;
                    const textInfo = (event.querySelector("p.text-gray-500") as HTMLElement | null)?.innerText.trim() || null;

                    // en live  es score, en prematch es date_game
                    const score =  (isLive ? textInfo : null) as string;
                    const date_game = (!isLive ? textInfo : null) as string;

                    const event_name = (event.querySelector("span.text-sm")?.textContent?.trim() || null) as string;
                    const league_name = (event.querySelector("span.text-gray-600")?.textContent?.trim() || null) as string;
                    const market = (event.querySelector("p.text-center")?.textContent?.trim() || null) as string;
                    const odds = (event.querySelector(".col-span-1")?.textContent?.trim() || null) as string;
                    const arrow = (event.querySelector(".col-span-1 img") as HTMLImageElement | null)?.alt as string;

                    const arrowClass = (arrow === "UP" ? "icomoon-arrow-up" : arrow === "DOWN" ? "icomoon-arrow-down" : null) as string;

                    // verificar si al menos  un campo importante tiene un valor válido
                    if (book_name || textInfo || event_name || league_name || market || odds) {
                        const sectionData: SectionSurebet = {
                            book_name: (book_name && changeBookName(book_name)) as string,
                            event_name,
                            league_name,
                            market,
                            odds,
                            arrowClass
                        };

                        // agregar score o date_game según el tipo
                        if (isLive) {
                            sectionData.score = score;
                        } else {
                            sectionData.date_game = date_game;
                        }

                        sections.push(sectionData);
                    }
                });

                surebet.push({
                    header: {
                        percent,
                        percent_color,
                        sportName,
                        home1: (sections[0]?.book_name ?? null) as string,
                        home2: (sections[1]?.book_name ?? null) as string,
                        period,
                        middle_value,
                        time,
                    },
                    sections,
                });

                console.log("➡️ Datos scrapeados de ", scrapeType,  ": ", surebet[surebet.length - 1].header.time);
            });

            return surebet;
        }, type);

        return datos;
    } catch (error) {
        console.error(`❌ Error en getDataForScrap (${type}):`, error);
        return [];
    }
};
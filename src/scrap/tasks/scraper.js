export const scrapData = async (page, type = 'live') => {
    try {
        let datos = await page.evaluate((scrapeType) => {
            const changeBookName = (book) => {
                const NameMap = {
                    Marathonbet: "Marathon",
                };
                return NameMap[book] || book;
            };

            const content = document.querySelector(".mt-1");
            if (!content) return [];

            const surebet = [];
            const isLive = scrapeType === 'live';

            const timeSelector = isLive ? ".col-span-2 > p.ng-tns-c1499674981-3" : ".col-span-2 > p.ng-tns-c3920731124-3";

            content.querySelectorAll(".panel").forEach((item) => {
                const events = item.querySelectorAll(".ng-star-inserted");
                const percent_color = getComputedStyle(item.querySelector(".col-span-2")).backgroundColor;
                const percent = item.querySelector(".col-span-2")?.textContent?.trim() ?? null;
                const middle_value = item.querySelector("span.bg-yellow-500")?.textContent?.trim() || null;
                const sportName = item.querySelector(".col-span-7 > span.font-semibold")?.textContent?.trim() || null;
                const period = item.querySelector(".col-span-7 > span.font-normal")?.textContent?.trim() || null;
                const time = item.querySelector(timeSelector)?.textContent?.trim() || null;

                const sections = [];

                events.forEach((event) => {
                    const book_name = event.querySelector("img.h-6")?.alt || null;
                    const textInfo = event.querySelector("p.text-gray-500")?.innerText.trim() || null;

                    const score = isLive ? textInfo : null;
                    const date_game = !isLive ? textInfo : null;

                    const event_name = event.querySelector("span.text-sm")?.textContent?.trim() || null;
                    const league_name = event.querySelector("span.text-gray-600")?.textContent?.trim() || null;
                    const market = event.querySelector("p.text-center")?.textContent?.trim() || null;
                    const odds = event.querySelector(".col-span-1")?.textContent?.trim() || null;
                    const arrow = event.querySelector(".col-span-1 img")?.alt || null;

                    const arrowClass = arrow === "UP" ? "icomoon-arrow-up" :
                        arrow === "DOWN" ? "icomoon-arrow-down" : null;

                    if (book_name || textInfo || event_name || league_name || market || odds) {
                        const sectionData = {
                            book_name: book_name ? changeBookName(book_name) : null,
                            event_name,
                            league_name,
                            market,
                            odds,
                            arrowClass
                        };

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
                        home1: sections[0]?.book_name ?? null,
                        home2: sections[1]?.book_name ?? null,
                        period,
                        middle_value,
                        time,
                    },
                    sections,
                });
            });

            return surebet;
        }, type);

        return datos;
    } catch (error) {
        console.error(`❌ Error en getDataForScrap (${type}):`, error);
        return [];
    }
};

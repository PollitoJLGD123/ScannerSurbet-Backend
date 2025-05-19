
import { Surebet, SectionSurebet, HeaderSurebet } from "../../types/socket.type";

export const organizationData = async (surebet: Surebet[]) => {
    if (!Array.isArray(surebet) || surebet.length === 0) return [];

    const result = [];

    // Mapeo de casas originales a reemplazos (puede ser uno o varios)
    const replacements: { [key: string]: string[] } = {
        BookMaker: ["Betcris"],
        Goldenpalace: ["Apuesta Total", "Ecuabet", "Doradobet"],
        TonyBet: ["Duelbits", "20bet"],
        Totogaming: ["Tinbet"]
    };

    const updateHeader = (header: HeaderSurebet, index: number, newName: string) => {
        const updated = { ...header };
        if (index === 0) updated.home1 = newName;
        else if (index === 1) updated.home2 = newName;
        return updated;
    };

    for (const item of surebet) {
        const { header, sections } = item;

        // Buscar los índices de todas las casas que necesitan ser reemplazadas
        sections.forEach((section: SectionSurebet, index: number) => {
            const originalName = section.book_name;
            const replacementsForBook = replacements[originalName];

            if (replacementsForBook) {
                for (const newBookName of replacementsForBook) {
                    const newSections = [...sections];
                    newSections[index] = { ...newSections[index], book_name: newBookName };
                    const newHeader = updateHeader(header, index, newBookName);
                    result.push({ header: newHeader, sections: newSections });
                }
            }
        });
        // agregar el original al final
        result.push(item);
    }

    return result;
};

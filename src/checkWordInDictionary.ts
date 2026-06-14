interface WiktionarySectionsResponse {
    parse?: {
        sections?: Array<{
            line: string;
        }>;
    };
    error?: {
        code: string;
        info: string;
    };
}

async function wordExistsInLanguage(word: string, language: string): Promise<boolean> {
    const url =
        "https://en.wiktionary.org/w/api.php" +
        `?action=parse` +
        `&page=${encodeURIComponent(word)}` +
        `&prop=sections` +
        `&format=json` +
        `&origin=*`;

    try {
        const response = await fetch(url);

        if (!response.ok) return false;

        const data = await response.json() as WiktionarySectionsResponse;

        // Word doesn't exist
        if (data.error) return false;

        const sections = data.parse?.sections ?? [];

        return sections.some((section) => section.line.toLowerCase() === language.toLowerCase());

    } catch (error) {
        console.error("Wiktionary lookup failed:", error);
        return false;
    }
}

export async function checkWordExists(wordToCheck: string, languageToCheck: string): Promise<boolean> {
    const isWordInLanguage = await wordExistsInLanguage(wordToCheck, languageToCheck);
    return isWordInLanguage;
}
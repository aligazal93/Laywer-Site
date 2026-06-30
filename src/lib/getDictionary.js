import ar from "@/langs/ar.json";
import en from "@/langs/en.json";

const dictionaries = {
    ar,
    en,
};

export function getDictionary(locale) {
    return dictionaries[locale] || dictionaries.ar;
}
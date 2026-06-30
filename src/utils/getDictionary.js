import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

export const getDictionary = (locale) => {
    return locale === "ar" ? ar : en;
};
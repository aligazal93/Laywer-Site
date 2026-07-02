
export const saveLang = (lang) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang);
  }
};

export const getLang = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("lang") || "ar";
  }

  return "ar";
};
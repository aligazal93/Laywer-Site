// services/homeService.js

import api from "@/utils/api";


export const getAboutApi = async (locale) => {
  const { data } = await api.get("about", {
    headers: {
      "lang": locale,
    },
  });

  return data;
};
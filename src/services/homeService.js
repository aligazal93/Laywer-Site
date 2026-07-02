// services/homeService.js

import api from "@/utils/api";


export const getHomeApi = async (locale) => {
  const { data } = await api.get("/home", {
    headers: {
      "lang": locale,
    },
  });

  return data;
};
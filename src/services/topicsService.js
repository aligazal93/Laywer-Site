import api from "@/utils/api";


export const getTopicsApi = async (locale) => {
  const { data } = await api.get("/topics", {
    headers: {
      "lang": locale,
    },
  });

  return data;
};
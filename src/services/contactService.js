import api from "@/utils/api";

export const getContactApi = async (locale) => {
  const { data } = await api.get("contact_us", {
    headers: {
      "lang": locale,
    },
  });

  return data;
};
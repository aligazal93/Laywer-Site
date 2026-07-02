import api from "@/utils/api";

export const getTopicDetailsApi = async ({ id, locale }) => {
  const { data } = await api.get(`/topics/${id}`, {
    headers: {
      lang: locale,
    },
  });

  return data;
};
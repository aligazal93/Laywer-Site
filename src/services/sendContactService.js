import api from "@/utils/api";

export const sendEmailApi = async (payload) => {
  const { data } = await api.post("send_email", payload);
  return data;
};
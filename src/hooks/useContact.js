"use client";

import { getContactApi } from "@/services/contactService";
import { useQuery } from "@tanstack/react-query";

export const useContact = (locale) => {
  return useQuery({
    queryKey: ["contact", locale],
    queryFn: () => getContactApi(locale),
  });
};
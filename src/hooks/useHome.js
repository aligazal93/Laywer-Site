"use client";

import { useQuery } from "@tanstack/react-query";
import { getHomeApi } from "@/services/homeService";

export const useHome = (locale) => {
  return useQuery({
    queryKey: ["home", locale],
    queryFn: () => getHomeApi(locale),
  });
};
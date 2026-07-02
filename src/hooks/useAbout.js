"use client";

import { getAboutApi } from "@/services/aboutSevice";
import { useQuery } from "@tanstack/react-query";

export const useAbout = (locale) => {
  return useQuery({
    queryKey: ["about", locale],
    queryFn: () => getAboutApi(locale),
  });
};
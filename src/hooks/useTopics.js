"use client";

import { getTopicsApi } from "@/services/topicsService";
import { useQuery } from "@tanstack/react-query";

export const useTopics = (locale) => {
  return useQuery({
    queryKey: ["topics", locale],
    queryFn: () => getTopicsApi(locale),
  });
};
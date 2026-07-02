"use client";

import { getTopicDetailsApi } from "@/services/topicsDetails";
import { useQuery } from "@tanstack/react-query";

export const useTopicDetails = (id, locale) => {
  return useQuery({
    queryKey: ["topic-details", id, locale],
    queryFn: () => getTopicDetailsApi({ id, locale }),
    enabled: Boolean(id && locale),
  });
};
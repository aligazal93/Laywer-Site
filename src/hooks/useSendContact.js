"use client";

import { sendEmailApi } from "@/services/sendContactService";
import { useMutation } from "@tanstack/react-query";

export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmailApi,
  });
};
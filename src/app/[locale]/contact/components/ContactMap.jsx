"use client";

import LoadingCard from "@/app/components/LoadingCard";
import ErrorState from "@/app/components/ErrorState";
import { useContact } from "@/hooks/useContact";

export default function ContactMap({ locale }) {
  const { data, isLoading, error } = useContact(locale);

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorState />;

  const address =
    data?.informations?.address || "Abu Dhabi, United Arab Emirates";

  return (
    <div className="mt-8 mb-10 overflow-hidden rounded-3xl">
      <iframe
        title="Contact Location"
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          address
        )}&z=13&output=embed`}
        className="h-[300px] w-full border-0 md:h-[400px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
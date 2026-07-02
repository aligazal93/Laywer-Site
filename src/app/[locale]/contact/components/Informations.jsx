"use client";

import { FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { useContact } from "@/hooks/useContact";
import LoadingCard from "@/app/components/LoadingCard";
import ErrorState from "@/app/components/ErrorState";
import InfoItem from "./InfoItem";
import SocialLink from "./SocialLink";

export default function Informations({ locale }) {
  const { data, isLoading, error, refetch } = useContact(locale);

  if (isLoading) return <LoadingCard />;
if (error) {
  console.log("Contact Error:", error);
  console.log("Status:", error?.response?.status);
  console.log("Response:", error?.response?.data);
  console.log("URL:", error?.config?.url);
  console.log("Base URL:", error?.config?.baseURL);
  console.log("Headers:", error?.config?.headers);

  return (
    <ErrorState
      title="فشل تحميل بيانات التواصل"
      description={
        error?.response?.data?.message ||
        error?.message ||
        "حدث خطأ غير متوقع"
      }
      onRetry={refetch}
    />
  );
}

  const contact = data?.informations || {};

  return (
    <div className="h-full rounded-[24px] bg-[#00091F] p-6 md:p-8">
      <div className="space-y-9">
        <InfoItem icon="/images/address.png" title="العنوان" text={contact.address} />
        <InfoItem icon="/images/envelop.png" title="البريد الإلكتروني" text={contact.email} />
        <InfoItem icon="/images/phone.png" title="الهاتف" text={contact.phone} dir="ltr" />
        <InfoItem icon="/images/time.png" title="أوقات العمل" text={contact.working_hours} />
      </div>

      <div className="mt-9 border-t border-white/10 pt-7">
        <h3 className="text-custom16 font-bold text-white">
          تابعنا على وسائل التواصل
        </h3>

        <ul className="mt-5 flex gap-3">
          <SocialLink href={contact.instagram} label="Instagram">
            <FaInstagram size={18} />
          </SocialLink>

          <SocialLink href={contact.snapchat} label="Snapchat">
            <FaSnapchatGhost size={18} />
          </SocialLink>

          <SocialLink href={contact.tiktok} label="TikTok">
            <FaTiktok size={18} />
          </SocialLink>

          <SocialLink href={contact.twitter} label="X">
            <RiTwitterXFill size={18} />
          </SocialLink>
        </ul>
      </div>
    </div>
  );
}
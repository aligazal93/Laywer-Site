"use client";

import { saveLang } from "@/utils/lang";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function ChangeLanguage() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "ar";
  const nextLocale = currentLocale === "ar" ? "en" : "ar";

  const handleChangeLanguage = () => {
    saveLang(nextLocale);

    const segments = pathname.split("/");
    segments[1] = nextLocale;

    router.push(segments.join("/"));
  };

  return (
    <button
      onClick={handleChangeLanguage}
      className="flex items-center gap-2 px-4 py-2 text-custom14 font-[700] text-white"
    >
      {currentLocale === "ar" ? "En" : "العربية"}

      <Image
        src="/images/wd.png"
        alt="language"
        width={16}
        height={16}
      />
    </button>
  );
}
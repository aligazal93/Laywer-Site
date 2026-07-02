"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAbout } from "@/hooks/useAbout";
import LoadingCard from "@/app/components/LoadingCard";
import ErrorState from "@/app/components/ErrorState";

export default function MyCv({ locale }) {
    const { data, isLoading, error } = useAbout(locale);
    if (isLoading) return <LoadingCard />;
    if (error) return <ErrorState />;
    const aboutData = data?.about || {};
  const isArabic = locale === "ar";

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-26"
    >
      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center lg:text-right"
        >
          <span className="mb-6 inline-block text-custom18 font-semibold text-secondary">
            • المسيرة المهنية
          </span>

          <h2 className="mb-8  text-[32px] font-bold leading-[1.6] text-white md:text-[42px] lg:ml-auto">
            رحلة من التفاني في خدمة العدالة
          </h2>

          <div className="space-y-5 text-custom16 leading-[35px] text-[#95AAC7]">
            <p className="mb-2 lg:mb-[120px]">
              {aboutData?.bio || ""}

            </p>


          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <div className="mb-[60px] lg:mb-[100px] overflow-hidden">
            <Image
              src="/images/about-2.png"
              alt="علي سعيد الشامسي"
              width={820}
              height={620}
              className="h-full block mx-auto w-full lg:w-[500px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

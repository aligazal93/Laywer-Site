"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAbout } from "@/hooks/useAbout";
import LoadingCard from "@/app/components/LoadingCard";
import ErrorState from "@/app/components/ErrorState";

export default function AboutHero({ locale }) {
  const { data, isLoading, error } = useAbout(locale);
  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorState />;
  const aboutData = data?.about || {};
  const isArabic = locale === "ar";
  return (
    <section className="relative min-h-screen mb-[20px] overflow-hidden  pt-28">
      <div className="absolute inset-0">
        <Image
          src="/images/intro-4.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative pt-10 z-10 mx-auto flex min-h-[calc(100vh-112px)] max-w-[1200px] flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-custom28 font-[700] text-white md:text-custom28"
        >
          {aboutData?.job_title || ""}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="lg:block hidden pointer-events-none absolute top-[155px] z-0 whitespace-nowrap text-[32px] font-bold leading-none text-secondary  md:text-[92px] lg:text-[100px]"
        >
          {aboutData?.name || ""}
        </motion.h1>

        <div className="relative z-10 mt-8 grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-center lg:col-span-4 lg:pb-24 lg:text-start"
          >
            <p className="text-custom14 line-clamp-6   leading-8 text-white/85">
              {aboutData?.right_text || ""}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center  lg:col-span-4"
          >
            <Image
              src={aboutData?.main_image || ""}
              alt="علي سعيد الشامسي"
              width={560}
              height={680}
              priority
              className="h-auto w-full max-w-[360px] object-contain md:max-w-[430px] lg:max-w-[520px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-center lg:col-span-4 lg:pb-2 lg:text-start"
          >
            <p className="text-custom14 leading-8 line-clamp-6  text-white/85">
              {aboutData?.left_text || ""}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

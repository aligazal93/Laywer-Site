"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function AboutSection({ locale }) {
  const isArabic = locale === "ar";

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-primary bg-[url('/images/intro-2.png')] bg-cover bg-center bg-no-repeat py-48"
    >
    
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#07111F]/50" />

      {/* Right to Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#07111F]/20 via-[#07111F]/30 to-[#07111F]" />

      {/* Top & Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/20 via-transparent to-[#07111F]" />
      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center lg:text-right"
        >
          <span className="mb-6 inline-block text-custom14 font-semibold text-secondary">
            • منهج يرتكز على الثقة والوضوح
          </span>

          <h2 className="mb-8  text-[32px] font-bold leading-[1.6] text-white md:text-[42px] lg:ml-auto">
            وراء كل قرار قانوني ناجح، رؤية تُبنى على الخبرة والالتزام.
          </h2>

          <div className="space-y-5 text-custom18 leading-relaxed text-[#95AAC7]">
            <p>
              اسمي علي سعيد الشامسي، محامٍ ومستشار قانوني أؤمن بأن العمل
              القانوني يبدأ بفهم احتياجات العميل قبل البحث عن الحلول. لذلك أحرص
              على تقديم استشارات وخدمات قانونية تجمع بين التحليل الدقيق، والرؤية
              الاستراتيجية، والالتزام بأعلى معايير المهنية والسرية.
            </p>
          </div>

          <Link
            href="#"
            className="mt-8 inline-flex items-center gap-3 duration-300 rounded-full bg-secondary px-6 py-3 text-custom16 font-semibold text-white transition hover:bg-secondary/90"
          >
            تعرّف على السيرة المهنية
            <FaArrowCircleLeft
              size={22}
              className={`text-white ${
                isArabic ? "rotate-[30deg]" : "rotate-[130deg]"
              }`}
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <div className="rounded-[0_48px_48px_48px] overflow-hidden">
            <Image
              src="/images/about.png"
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

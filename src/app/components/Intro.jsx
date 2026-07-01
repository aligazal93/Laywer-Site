"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Intro({ locale }) {
  const isArabic = locale === "ar";

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: isArabic ? -60 : 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.25,
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden pb-0 bg-primary">
      <div className="absolute inset-0">
        <Image
          src="/images/intro.png"
          alt="مكتب محاماة"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061321]/50" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[primary]/5 via-[primary]/5 to-[primary]/10" /> */}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] items-center px-6 pt-24">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="order-2 text-center lg:order-1 lg:text-right"
          >
            <motion.span
              variants={itemVariants}
              className="mb-5 inline-block rounded-full border border-[#D3AA60]/40 bg-[#BA8632]/10 px-5 py-2 text-custom18 text-[#D3AA60]"
            >
              المحامي والمستشار القانوني
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mb-5 font-[700] text-[#BA8632] md:text-custom44"
            >
              علي سعيد الشامسـي
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="mb-5 text-2xl font-[700] text-white md:text-custom30"
            >
              شريكك القانوني في اتخاذ القرارات بثقة.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mx-auto mb-8 max-w-[620px] text-base leading-8 text-white/75 lg:mx-0"
            >
              أعمل مع الأفراد ورواد الأعمال والشركات لتقديم حلول قانونية واضحة،
              واستراتيجيات مدروسة، واستشارات تُبنى على المعرفة، والخبرة،
              والالتزام المهني.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <Link
                href={`/${locale}/contact`}
                className="flex items-center gap-2 rounded-full bg-secondary px-7 py-3 text-sm font-medium text-white transition hover:bg-[#b98f45]"
              >
                احجز استشارتك الآن{" "}
                {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
              </Link>

              <Link
                href="#about"
                className="rounded-full border-2 border-secondary px-7 py-3 text-sm font-medium text-white transition hover:bg-secondary hover:text-white"
              >
                تعرّف عليّ
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="order-1 flex justify-center lg:justify-start"
          >
            <div className="relative h-[480px] w-[360px] md:h-[620px] md:w-[460px]">
              <Image
                src="/images/person.png"
                alt="علي سعيد الشامسي"
                width={660}
                height={480}
                priority
                className="h-full object-contain object-bottom"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

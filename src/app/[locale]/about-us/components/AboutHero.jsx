"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function AboutHero({ locale }) {
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
          المحامي والمستشار القانوني
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="pointer-events-none absolute top-[155px] z-0 whitespace-nowrap text-[32px] font-bold leading-none text-secondary  md:text-[92px] lg:text-[100px]"
        >
          علي سعيــــــــــــــــــــــــــــــــــــــــــد الشامسـي
        </motion.h1>

        <div className="relative z-10 mt-8 grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="order-3 text-center lg:col-span-3 lg:pb-24 lg:text-right"
          >
            <p className="text-custom18 leading-8 text-white/85">
              القانون في عالم اليوم لم يعد خياراً جانبياً، بل أداة استراتيجية
              لحماية المصالح وبناء قرارات واضحة وسط تحديات ومتغيرات. أعمل مع كل
              عميل كأن قضيته الشخصية، وأمنحه كل عناية مستحقة من رؤية ومتابعة
              دقيقة للسرية والمصداقية المطلقة، وإيماناً بأن خدمة موكلي هي جوهر
              النزاهة ومساري المهني.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex justify-center lg:order-2 lg:col-span-6"
          >
            <Image
              src="/images/person-2.png"
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
            className="order-2 text-center lg:order-1 lg:col-span-3 lg:pb-2 lg:text-start"
          >
            <p className="text-custom18 leading-8 text-white/85">
              أؤمن أن القانون ليس مجرد نصوص تقرأ، بل هو درع يحمي الحقوق، وبوصلة
              تقود إلى العدالة. منذ أكثر من عقدين من الزمن، وأنا أرافق عملائي في
              أدق قضاياهم، واضعاً كل خبرتي ومهنتي في خدمتهم بثبات وثقة وأمان.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

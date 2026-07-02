"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDictionary } from "@/lib/getDictionary";

export default function LetsStart({ locale }) {
  const isArabic = locale === "ar";
  const dict = getDictionary(locale);
  return (
    <section
      id="about"
      className="relative overflow-hidden  bg-cover bg-center bg-no-repeat py-12 lg:py-48"
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-cover bg-center opacity-[0.08]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061321] to-transparent" />
      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <div className="rounded-[0_48px_48px_48px] overflow-hidden">
            <Image
              src="/images/pic-4.png"
              alt="علي سعيد الشامسي"
              width={820}
              height={620}
              className="h-full block mx-auto w-full lg:w-[500px]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center lg:text-right"
        >
          <span className="mb-6 inline-block text-custom14 font-semibold text-secondary">
            {dict.contactSection.badge}
          </span>

          <h2 className="mb-8  text-[32px] font-bold leading-[1.6] text-white md:text-[42px] lg:ml-auto">
            {dict.contactSection?.title}
          </h2>

          <div className="space-y-5 text-custom18 leading-relaxed text-[#95AAC7]">
            <p>
              {dict.contactSection.description}
            </p>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-flex items-center gap-3 duration-300 rounded-full bg-secondary px-6 py-3 text-custom16 font-semibold text-white transition hover:bg-secondary/90"
          >
           {dict.header.book}

          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useHome } from "@/hooks/useHome";
import LoadingCard from "./LoadingCard";
import ErrorState from "./ErrorState";
import { getDictionary } from "@/lib/getDictionary";

export default function LegalProcess({ locale }) {
  const { data, isLoading, error } = useHome(locale);
  const steps = data?.case_steps || [];
  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorState />;
  const dict = getDictionary(locale);

  const isArabic = locale === "ar";
  return (
    <section className="relative overflow-hidden bg-[url('/images/intro-3.png')] bg-cover bg-center bg-no-repeat py-0 lg:py-28">
      <div className="absolute inset-0 bg-[#07111F]/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/20 via-transparent to-[#07111F]" />

      <div className="relative z-10 w-full lg:max-w-[1200px] container">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-start">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex rounded-full bg-secondary/10 px-6 py-3 text-custom14 font-semibold text-secondary"
            >
              {dict?.services?.title}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full text-[26px] font-bold leading-relaxed text-white md:text-custom2"
            >
              {dict?.services?.subtitle}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className=""
          >
            <Link
              href={`${locale}/contact`}
              className="inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3 text-custom14 font-semibold text-white transition hover:bg-[#b98f45]"
            >
             {dict?.header?.book}
              <FaArrowCircleLeft
                size={22}
                className={`text-white ${
                  isArabic ? "rotate-[30deg]" : "rotate-[130deg]"
                }`}
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-4 w-full">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative w-full overflow-hidden rounded-[24px] px-5 py-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:px-10 md:py-9 before:absolute before:inset-0 before:rounded-[24px] before:bg-gradient-to-b before:from-white/[0.05] before:via-transparent before:to-transparent before:pointer-events-none"
                >
                  <span className="mb-4 block text-custom14 font-[700] text-secondary">
                    {step.step_rank}
                  </span>

                  <h3 className="mb-4 text-[22px] font-bold text-white md:text-custom28">
                    {step?.title}
                  </h3>

                  <p className="w-full leading-7 text-[#95AAC7] text-custom16">
                    {step?.content || ""}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[520px] items-center justify-center lg:col-span-5"
            >
              <Image
                src="/images/pic-1.png"
                alt="ميزان العدالة"
                width={520}
                height={520}
                className="h-auto w-full max-w-[500px] object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

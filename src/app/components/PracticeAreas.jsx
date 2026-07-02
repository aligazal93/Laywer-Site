"use client";

import { motion } from "framer-motion";
import PracticeCard from "./cards/PracticeCard";
import { useHome } from "@/hooks/useHome";
import LoadingCard from "./LoadingCard";
import ErrorState from "./ErrorState";
import { getDictionary } from "@/lib/getDictionary";

export default function PracticeAreas({ locale }) {
    const { data, isLoading, error } = useHome(locale);
    const services = data?.services || [];
    const dict = getDictionary(locale);
  
    if (isLoading) return <LoadingCard />;
  
    if (error) return <ErrorState />;
  return (
    <section className="relative overflow-hidden pb-[50px] lg:pt-[50px] pt-[20px] lg:pb-[100px] ">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex rounded-full bg-secondary/10 px-6 py-2 text-custom16 font-semibold text-secondary"
          >
            {dict?.practice?.title}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[26px] font-bold leading-relaxed text-white md:text-[34px]"
          >
           {dict?.practice?.subtitle}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {services.map((item, index) => (
            <PracticeCard key={index} item={item} index={index}  />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useHome } from "@/hooks/useHome";
import { motion } from "framer-motion";
import Image from "next/image";
import LoadingCard from "./LoadingCard";
import ErrorState from "./ErrorState";
import { getDictionary } from "@/lib/getDictionary";

export default function ValuesSection({ locale }) {
  const { data, isLoading, error } = useHome(locale);
  const goals = data?.goals || [];
  const dict = getDictionary(locale);

  if (isLoading) return <LoadingCard />;

  if (error) return <ErrorState />;

  return (
    <section className="relative overflow-hidden  py-24">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t " />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex rounded-full bg-[#BA8632]/20 px-6 py-2 text-custom14 font-semibold text-secondary"
        >
          {dict?.about?.title}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center w-full lg:w-[80%] block mx-auto text-custom22 font-[500] leading-[1.9] text-white "
        >
          {dict?.about?.description}
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {goals.map((item, index) => {
            return (
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
                className="relative px-8 text-center lg:border-r lg:border-secondary/20 first:lg:border-r-0"
              >
                <Image
                  src={item?.icon || ""}
                  alt={item?.title || "icon"}
                  width={40}
                  height={40}
                  className="mx-auto mb-6 h-10 w-10 object-cover"
                />

                <h3 className="mb-4 text-custom20 font-bold text-white">
                  {item?.title}
                </h3>

                <p className="mx-auto max-w-[230px] text-custom12 leading-6 text-white/50">
                  {item?.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

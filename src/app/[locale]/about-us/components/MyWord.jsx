"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MyWord({ locale }) {
  return (
    <section className="relative py-10 lg:py-20 bg-[url('/images/layer.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-primary/25" />

      <div className="relative z-10 mx-auto w-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-[220px] leading-none text-secondary/50"
        >
          <Image width={150} height={150} className="block mx-auto" src="/images/q-1.png" alt="quote" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto w-full lg:w-[60%] text-[34px] font-bold leading-[1.9] text-white md:text-[52px]"
        >
          الثقة تُبنى بالفعل قبل القول، والعدالة تُنال بالصبر قبل الحكم.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-custom18 font-[700] text-white"
        >
          علي سعيد الشامسي
        </motion.p>
      </div>
    </section>
  );
}
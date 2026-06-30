"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PracticeCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative min-h-[260px] overflow-hidden rounded-[14px] border border-white/10"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
      />


      <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-center px-9 text-start">
        <Image
          src={item.icon}
          alt=""
          width={44}
          height={44}
          className="mb-4 h-11 w-11 object-contain"
        />

        <h3 className="mb-2 text-custom24 font-[700] text-white">
          {item.title}
        </h3>

        <p className="max-w-[300px] text-custom12 leading-[34px] text-[#95AAC7]">
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}
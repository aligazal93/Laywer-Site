"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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
      className="group relative min-h-[250px] overflow-hidden rounded-[10px] border border-white/20"
    >
      <Image
        src={item?.image || "/images/icon-1.png"}
        alt={item?.name || "item"}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/45 to-black/80" />

      <div className="relative z-[10] flex h-full min-h-[320px] flex-col justify-end px-4 text-start">
        <Image
          src={item?.icon || "/images/icon-1.png"}
          alt={item?.name || "item"}
          width={44}
          height={44}
          className="h-15 w-15 object-cover"
        />

        <h1
          href={item?.link || "/"}
          className="text-custom22 mb-1 font-[700] text-white"
        >
          {item?.name || "item"}
        </h1>

        <p className="mb-4 w-full overflow-hidden text-custom14 leading-[30px] text-white">
          {item?.content || "item"}
        </p>
      </div>
    </motion.div>
  );
}

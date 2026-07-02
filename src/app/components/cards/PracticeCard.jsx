"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PracticeCard({ item, index }) {
  console.log("IMAGE DEBUG:", item?.image);
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
      className="group relative min-h-[250px] overflow-hidden rounded-[10px] border border-white/10"
    >
      <Image
        src={item?.image || "/images/icon-1.png"}
        alt={item?.name || "item"}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
      />


      <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-center px-9 text-start">
        <Image
          src={item?.icon || "/images/icon-1.png"}
          alt={item?.name || "item"}
          width={44}
          height={44}
          className="mb-3 h-15 w-15 object-cover"
        />

        <h3 className="mb-2 text-custom24 font-[700] text-white">
          {item?.name || "item"}
        </h3>

        <p className="lg:max-w-[350px] w-full overflow-hidden line-clamp-2 text-custom14 leading-[34px] text-[#95AAC7]">
          {item?.content || "item"}
        </p>
      </div>
    </motion.div>
  );
}
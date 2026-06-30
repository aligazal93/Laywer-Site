"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function ArticleDetails({ article, index , locale }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      className="group relative min-h-[430px] overflow-hidden rounded-2xl border border-[#0D2749]"
    >
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/65 to-transparent" />

      <div className="absolute bottom-0 right-0 z-10 p-8 text-right">
        <h3 className="mb-4 text-custom22 font-bold text-white">
          {article.title}
        </h3>

        <p className="mb-5 text-custom14 leading-7 text-[#95AAC7]">
          {article.description}
        </p>

        <Link
           href={`/${locale}/articles/${article.id}`}
          className="inline-flex items-center gap-2 text-secondary"
        >
          اقرأ المقال
          <FaArrowLeft />
        </Link>
      </div>
    </motion.div>
  );
}
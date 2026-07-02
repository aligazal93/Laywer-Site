"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function FeaturedArticleCard({ article, locale }) {
  const isArabic = locale === "ar";
    const stripHtml = (html) => {
    return html.replace(/<[^>]+>/g, "");
  };
  console.log("IMAGE DEBUG:", article?.image);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={article.id}
        initial={{ opacity: 0, x: 30, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-2xl"
      >
        <Image
          src={article?.image || "/images/icon-1.png"}
          alt={article?.title || "article"}
          width={700}
          height={600}
          className="h-[540px] w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />

        <div className="absolute bottom-0 right-0 p-10 text-start">
          <h3 className="mb-5 text-custom24 font-bold text-white">
            {article?.title}
          </h3>

          <p className="mb-6 leading-8 line-clamp-3 text-white/70">
            {stripHtml(article?.content || "")}
          </p>

          <Link href="#" className="inline-flex items-center gap-2 text-secondary">
            اقرأ المقال
            <FaArrowLeft size={22} className={`${isArabic ? "rotate-[0deg]" : "rotate-[180deg]"}`} />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
"use client";

import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function ArticleCard({
  article,
  index,
  isActive,
  onClick,
  locale,
}) {
  const isArabic = locale === "ar";

  const stripHtml = (html) => {
    return html.replace(/<[^>]+>/g, "");
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className={`block w-full rounded-2xl border p-6 text-start transition ${
        isActive
          ? "border-secondary bg-secondary/10"
          : "border-[#0D2749] bg-transparent hover:border-secondary/50"
      }`}
    >
      <h3 className="mb-2 text-custom18 font-bold text-white">
        {article.title}
      </h3>

      <p className="mb-0 line-clamp-2 text-custom16 leading-7 text-white/50">
        {stripHtml(article.content)}
      </p>

      {/* <span className="inline-flex items-center gap-2 text-custom16 font-[700] text-secondary">
        اقرأ المقال
        <FaArrowLeft
          size={22}
          className={`transition-transform duration-300 ${
            isArabic ? "rotate-0" : "rotate-180"
          }`}
        />
      </span> */}
    </motion.button>
  );
}

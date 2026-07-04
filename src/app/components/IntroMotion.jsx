"use client";

import { motion } from "framer-motion";

export default function IntroMotion({
  children,
  className = "",
  type = "content",
  isArabic,
}) {
  const variants =
    type === "image"
      ? {
          hidden: {
            opacity: 0,
            x: isArabic ? -40 : 40,
            scale: 0.98,
          },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            },
          },
        }
      : {
          hidden: {
            opacity: 0,
            y: 30,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
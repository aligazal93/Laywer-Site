"use client";

import { motion } from "framer-motion";
import PracticeCard from "./cards/PracticeCard";

const practices = [
  {
    title: "القضايا المدنية والتجارية",
    text: "معالجة المنازعات المدنية والتجارية، وتقديم الحلول القانونية التي تساعد على حماية الحقوق وإدارة النزاعات بكفاءة واحترافية.",
    image: "/images/k-1.png",
    icon: "/images/c-1.png",
  },
  {
    title: "القضايا الجنائية",
    text: "تمثيل العملاء في القضايا، وتقديم الدعم القانوني في مختلف مراحل الدعوى، مع الالتزام بحماية حقوقهم وضمان اتباع الإجراءات القانونية.",
    image: "/images/k-2.png",
    icon: "/images/c-3.png",
  },
  {
    title: "قضايا الشركات والعقود",
    text: "تقديم الدعم القانوني للشركات، وصياغة العقود ومراجعتها، بما يضمن حماية المصالح القانونية وتقليل المخاطر في مختلف التعاملات.",
    image: "/images/k-3.png",
    icon: "/images/c-3.png",
  },
  {
    title: "الأحوال الشخصية والأسرة",
    text: "تقديم الخدمات القانونية المتعلقة بقضايا الأسرة، بما يشمل مسائل الزواج والطلاق والنفقة والحضانة والميراث، مع مراعاة خصوصية كل حالة.",
    image: "/images/k-4.png",
    icon: "/images/c-2.png",
  },
];

export default function PracticeAreas() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex rounded-full bg-secondary/10 px-6 py-2 text-custom16 font-semibold text-secondary"
          >
            • مجالات الممارسة القانونية
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[26px] font-bold leading-relaxed text-white md:text-[34px]"
          >
            أقدم خدمات قانونية متخصصة في عدد من المجالات الرئيسية
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {practices.map((item, index) => (
            <PracticeCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
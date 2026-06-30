"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaHandshake, FaBullseye, FaShieldAlt, FaTrophy } from "react-icons/fa";

const values = [
  {
    icon: "/images/icon-1.png",
    title: "المسؤولية",
    text: "أتعامل مع ملفك باهتمام كامل، وتقديم الدعم القانوني الذي يساعد العميل على اتخاذ قرارات واثقة.",
  },
  {
    icon: "/images/icon-2.png",
    title: "الدقة",
    text: "تحليل الوقائع والأنظمة بعناية للوصول إلى حلول قانونية مدروسة تستند إلى أسس واضحة.",
  },
  {
    icon: "/images/icon-4.png",
    title: "الخصوصية",
    text: "التعامل مع جميع المعلومات والوثائق بأعلى درجات السرية مع احترام خصوصية كل قضية وكل عميل.",
  },
  {
    icon: "/images/icon-4.png",
    title: "النزاهة",
    text: "الالتزام بالشفافية والمهنية في جميع مراحل العمل، بما يحفظ حقوق العميل ويعزز الثقة المتبادلة.",
  },
];

export default function ValuesSection({ locale }) {
  
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071b33] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex rounded-full bg-secondary/10 px-6 py-3 text-custom16 font-semibold text-secondary"
        >
          منهجي يرتكز على الدقة والوضوح
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-[850px] text-center text-custom14 font-bold leading-[1.9] text-white md:text-custom2"
        >
          أؤمن أن كل قضية تحمل تفاصيلها الخاصة، وأن أفضل الحلول القانونية تبدأ
          بالاستماع الجيد، والتحليل الدقيق، وفهم أهداف العميل قبل تقديم أي رأي
          أو اتخاذ أي إجراء. لذلك أحرص على تقديم استشارات وخدمات قانونية مبنية
          على المعرفة، والوضوح، والالتزام، بما يحقق أفضل النتائج الممكنة ضمن
          إطار القانون.
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative px-8 text-center lg:border-r lg:border-white/10 first:lg:border-r-0"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="mx-auto mb-6 h-10 w-10 object-contain"
                />

                <h3 className="mb-4 text-custom20 font-bold text-white">
                  {item.title}
                </h3>

                <p className="mx-auto max-w-[230px] text-custom12 leading-6 text-white/50">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

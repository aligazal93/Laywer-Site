"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MyCv({ locale }) {
  const isArabic = locale === "ar";

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-primary bg-[url('/images/layer.png')] bg-cover bg-center bg-no-repeat py-48"
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-cover bg-center opacity-[0.08]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061321] to-transparent" />
      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center lg:text-right"
        >
          <span className="mb-6 inline-block text-custom14 font-semibold text-secondary">
            • المسيرة المهنية
          </span>

          <h2 className="mb-8  text-[32px] font-bold leading-[1.6] text-white md:text-[42px] lg:ml-auto">
            رحلة من التفاني في خدمة العدالة
          </h2>

          <div className="space-y-5 text-custom18 leading-relaxed text-[#95AAC7]">
            <p>
              بدأت رحلتي في أروقة المحاكم الإماراتية، حيث تشربت روح القانون من
              منابعه الأصيلة. لم أعتمد يومًا على المسارات التقليدية وحدها، بل
              سعيت دائمًا إلى فهم أعمق لدقائق التشريعات وتقاطعاتها مع الواقع
              المعيش للناس والشركات. عبر السنوات، نسجت علاقات متينة مع نخبة من
              القضاة والمستشارين وزملاء المهنة، مؤسسًا لنفسي مكانة راسخة في
              الوسط القانوني. كل قضية خضتها أضافت إلى مخزوني المعرفي بُعدًا
              جديدًا، وكل تحدٍ واجهته صقل مهاراتي وجعلني أكثر استعدادًا لما هو
              أعقد. اليوم، وبعد أكثر من عشرين عامًا من العطاء المتواصل، أقف عند
              محطة جديدة من النضج المهني، حاملًا معي إرثًا من الثقة والمصداقية،
              ومتطلعًا إلى مستقبل أكون فيه شريكًا أمينًا لكل من يبحث عن العدالة.
            </p>


          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <div className="rounded-[0_48px_48px_48px] overflow-hidden">
            <Image
              src="/images/about-2.png"
              alt="علي سعيد الشامسي"
              width={820}
              height={620}
              className="h-full block mx-auto w-full lg:w-[500px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

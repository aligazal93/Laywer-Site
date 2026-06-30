import Image from "next/image";
import Link from "next/link";
import MoreArticles from "../components/MoreArticles";

const articles = [
  {
    id: "1",
    title: "ما الذي يجب أن تعرفه قبل أن توقع أي عقد تجاري؟",
    description: "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل، مع التواصل المستمر لضمان وضوح الخطوات وحماية مصالح العميل.",
    image: "/images/details.png",
    image2: "/images/pic-5.png",
  },
    {
    id: "2",
    title: "ما الذي يجب أن تعرفه قبل أن توقع أي عقد تجاري؟",
    description: "إدارة الإجراءات القانونية ومتابعة جميع مراحل العمل، مع التواصل المستمر لضمان وضوح الخطوات وحماية مصالح العميل.",
    image: "/images/details.png",
    image2: "/images/pic-5.png",
  },

];

export default async function ArticleDetailsPage({ params }) {
  const { locale, id } = await params;
  const isArabic = locale === "ar";


  const article = articles.find((item) => item.id === id);

  if (!article) {
    return (
      <section className="bg-primary py-[200px] text-center text-white">
        المقال غير موجود
      </section>
    );
  }

  return (
    <main className="bg-primary">
      <section className="container py-[160px]">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 text-center">
            <span className="mb-2 inline-block px-6 py-3 text-custom14 font-[700] text-secondary">
              المحتوى القانوني
            </span>

            <h1 className="mx-auto w-full text-custom32 font-[700] leading-relaxed text-white">
              مقالات في القانون، بلغة تُقرأ.
            </h1>

            <p className="mx-auto mt-2 w-full text-custom16 leading-8 text-white">
              آراء ومقالات في المسائل القانونية — مكتوبة بأسلوب مباشر لمن يريد
              أن يفهم، لا أن يُقنَع.
            </p>
          </div>

          <div className="col-span-12">
            <div className="relative rounded-[24px] my-[100px] h-full md:h-[430px]">
              <Image
                src={article.image}
                alt={article.title}
                width={1280}
                height={720}
                priority
                className="object-cover mb-8"
              />
            </div>
          </div>

          {/* Content */}
          <article className="col-span-12 text-start lg:col-span-9">
            <h1 className="mb-2 text-custom20 font-bold leading-relaxed text-white md:text-custom36">
              {article.title}
            </h1>

            <p className="mb-8 text-custom16 w-full lg:w-[70%] leading-9 text-[#95AAC7]">
              عقود التجارة تعد من أكثر الأدوات القانونية تأثيرًا في علاقات
              الأعمال، فهي لا تحدد فقط الالتزامات بين الأطراف، بل تؤثر مباشرة
              على استقرار التعاملات وحماية المصالح.
            </p>

            <h2 className="mb-5 text-custom24 font-bold text-white">
              أولًا: هل قرأت العقد بالكامل؟
            </h2>

            <p className="mb-6 w-full lg:w-[70%] text-custom16 leading-9 text-[#95AAC7]">
              قبل توقيع أي عقد، يجب قراءة جميع البنود بعناية، وعدم الاكتفاء
              بالعناوين أو الاتفاقات الشفوية. فقد تحتوي بعض البنود على التزامات
              مالية أو قانونية لا تظهر بوضوح من النظرة الأولى.
            </p>

            <blockquote className={`mb-8 ${isArabic ? "border-r-4" : "border-l-4"}   border-secondary ${isArabic ? "pr-5 " : "pl-5 "} text-custom18 font-[700] leading-9 text-white/80`}>
              العقد ليس مجرد ورقة، بل التزام قانوني قد يترتب عليه آراء مهمة.
            </blockquote>

            <p className="mb-10 text-custom16 w-full lg:w-[70%] leading-9 text-[#95AAC7]">
              لذلك تساعد المراجعة القانونية قبل التوقيع على فهم الحقوق
              والالتزامات، وتقليل احتمالات النزاع مستقبلًا، وضمان وضوح العلاقة
              بين الأطراف.
            </p>

            <div className="relative mb-10 h-[260px] overflow-hidden lg:w-[70%] rounded-[24px] md:h-[430px]">
              <Image
                src={article.image2}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            <h2 className="mb-5 text-custom24 font-bold text-white">
              ثانيًا: هل قرأت العقد بالكامل؟
            </h2>

            <p className="mb-6 w-full lg:w-[70%] text-custom16 leading-9 text-[#95AAC7]">
              يجب التأكد من وضوح بنود العقد، وخصوصًا ما يتعلق بالمدة، المقابل
              المالي، شروط الإنهاء، المسؤوليات، وآلية حل النزاعات.
            </p>

            <blockquote className="mb-8 border-r-4 border-secondary pr-5 text-custom16 leading-9 text-white/80">
              الالتزام الذي لا تفهمه قبل التوقيع قد يصبح عبئًا بعد التنفيذ.
            </blockquote>

            <p className="text-custom16 w-full lg:w-[70%] leading-9 text-[#95AAC7]">
              في النهاية، وجود استشارة قانونية قبل التوقيع يمنحك رؤية أوضح
              ويساعدك على اتخاذ قرار أكثر أمانًا وثقة.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-[120px] rounded-[14px] bg-secondary p-6 text-center">
              <h3 className="mb-2 text-custom18 font-bold text-white">
                هل تحتاج استشارة خاصة؟
              </h3>

              <p className="mb-2 text-custom14 leading-6 text-white/80">
                يمكنك حجز استشارة قانونية خاصة للحصول على إجابة واضحة تناسب
                حالتك.
              </p>

              <Link
                href={`/${locale}#contact`}
                className="inline-flex rounded-full bg-primary px-5 py-2 text-custom14 transition-all duration-300 hover:bg-primary/80 font-bold text-white"
              >
                احجز استشارتك الآن
              </Link>
            </div>
          </aside>

          <div className="col-span-12">
            <MoreArticles locale={locale} articles={articles} />
          </div>
        </div>
      </section>
    </main>
  );
}

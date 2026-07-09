import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/getDictionary";
import { getHomeApi } from "@/services/homeService";

export default async function Intro({ locale }) {
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";

  const data = await getHomeApi(locale);
  const slides = data?.slide || {};
  const heroImage = slides?.image;

  return (
    <section
      id="home"
      aria-label={slides?.title || dict?.header?.home}
      className="relative min-h-screen overflow-hidden bg-primary"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/intro.png"
          alt=""
          fill
          sizes="100vw"
          quality={45}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061321]/60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] items-center px-6 py-24 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="lg:text-start animate-hero-content">
            {slides?.head_title && (
              <span className="mb-5 inline-block rounded-full border border-[#D3AA60]/40 bg-[#BA8632]/10 px-5 py-2 text-custom18 text-[#D3AA60]">
                {slides.head_title}
              </span>
            )}

            {slides?.title && (
              <h1 className="mb-5 text-3xl font-[700] text-[#BA8632] md:text-custom44">
                {slides.title}
              </h1>
            )}

            {slides?.sub_title && (
              <h2 className="mb-5 text-2xl font-[700] text-white md:text-custom30">
                {slides.sub_title}
              </h2>
            )}

            {slides?.content && (
              <p className="mx-auto mb-8 max-w-[620px] text-base leading-8 text-white/75 lg:mx-0">
                {slides.content}
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href={`/${locale}/contact`}
                prefetch={false}
                aria-label={dict?.header?.book}
                className="flex items-center gap-2 rounded-full bg-secondary px-7 py-3 text-sm font-medium text-white transition hover:bg-[#b98f45]"
              >
                {dict?.header?.book}
                <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
              </Link>

              <Link
                href={`/${locale}/about-us`}
                prefetch={false}
                aria-label={dict?.hero?.GetKnowMme}
                className="rounded-full border-2 border-secondary px-7 py-3 text-sm font-medium text-white transition hover:bg-secondary hover:text-white"
              >
                {dict?.hero?.GetKnowMme}
              </Link>
            </div>
          </div>

          <div className="relative mt-[50px] h-[360px] w-[280px] sm:h-[440px] sm:w-[340px] md:h-[560px] md:w-[420px] lg:mt-[150px] lg:h-[620px] lg:w-[460px]">
            <Image
              src={heroImage}
              alt={slides?.title || "علي سعيد الشامسي"}
              fill
              preload
              sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 420px, 460px"
              quality={75}
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

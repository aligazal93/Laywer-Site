import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/lib/getDictionary";

const BACKGROUND_IMAGE = "/images/intro.png";

const BACKGROUND_QUALITY = 40;
const HERO_QUALITY = 70;

export default  function Intro({ locale ,data }) {
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";


  const slide = data?.slide || {};
  const heroImage = slide?.image || null;

  const heroTitle =
    slide?.title ||
    (isArabic
      ? "علي سعيد الشامسي"
      : "Ali Saeed Al Shamsi");

  return (
    <section
      id="home"
      aria-labelledby={slide?.title ? "hero-title" : undefined}
      aria-label={
        slide?.title
          ? undefined
          : dict?.header?.home || "Homepage"
      }
      className="relative min-h-[100svh] overflow-hidden bg-primary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          sizes="100vw"
          quality={BACKGROUND_QUALITY}
          loading="eager"
          fetchPriority="low"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#061321]/70" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] items-center px-4 pb-12 pt-24 sm:px-6 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* المحتوى */}
          <div className="text-center lg:text-start">
            {slide?.head_title && (
              <span className="mb-5 inline-block rounded-full border border-[#D3AA60]/40 bg-[#BA8632]/10 px-5 py-2 text-custom18 text-[#D3AA60]">
                {slide.head_title}
              </span>
            )}

            {slide?.title && (
              <h1
                id="hero-title"
                className="mb-5 text-3xl font-[700] leading-tight text-[#BA8632] md:text-custom44"
              >
                {slide.title}
              </h1>
            )}

            {slide?.sub_title && (
              <h2 className="mb-5 text-2xl font-[700] leading-tight text-white md:text-custom30">
                {slide.sub_title}
              </h2>
            )}

            {slide?.content && (
              <p className="mx-auto mb-8 max-w-[620px] text-base leading-8 text-white/80 lg:mx-0">
                {slide.content}
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href={`/${locale}/contact`}
                prefetch={false}
                aria-label={dict?.header?.book}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#b98f45]"
              >
                <span>{dict?.header?.book}</span>

                <span aria-hidden="true">
                  {isArabic ? "←" : "→"}
                </span>
              </Link>

              <Link
                href={`/${locale}/about-us`}
                prefetch={false}
                aria-label={dict?.hero?.GetKnowMme}
                className="inline-flex items-center justify-center rounded-full border-2 border-secondary px-7 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-secondary"
              >
                {dict?.hero?.GetKnowMme}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-6 h-[350px] w-[270px] sm:h-[440px] sm:w-[340px] md:h-[550px] md:w-[420px] lg:mx-0 lg:mt-[110px] lg:h-[620px] lg:w-[460px]">
            {heroImage && (
              <Image
                src={heroImage}
                alt={heroTitle}
                fill
                preload
                sizes="
                  (max-width: 639px) 270px,
                  (max-width: 767px) 340px,
                  (max-width: 1023px) 420px,
                  460px
                "
                quality={HERO_QUALITY}
                className="object-contain object-bottom"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
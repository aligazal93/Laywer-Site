import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import IntroMotion from "./IntroMotion";
import { getDictionary } from "@/lib/getDictionary";
import { getHomeApi } from "@/services/homeService";

export default async function Intro({ locale }) {
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";

  const data = await getHomeApi(locale);
  const slides = data?.slide || {};

  return (
    <section
      id="home"
      aria-label={slides?.title || dict?.header?.home}
      className="relative min-h-screen overflow-hidden bg-primary pb-0"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/intro.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#061321]/50" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] items-center px-6 pt-32">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <IntroMotion
            isArabic={isArabic}
            className="order-2 text-center lg:order-1 lg:text-start"
          >
            <span className="mb-5 inline-block rounded-full border border-[#D3AA60]/40 bg-[#BA8632]/10 px-5 py-2 text-custom18 text-[#D3AA60]">
              {slides?.head_title}
            </span>

            <h1 className="mb-5 font-[700] text-[#BA8632] md:text-custom44">
              {slides?.title}
            </h1>

            <h2 className="mb-5 text-2xl font-[700] text-white md:text-custom30">
              {slides?.sub_title}
            </h2>

            <p className="mx-auto mb-8 max-w-[620px] text-base leading-8 text-white/75 lg:mx-0">
              {slides?.content}
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href={`/${locale}/contact`}
                aria-label={dict?.header?.book}
                className="flex items-center gap-2 rounded-full bg-secondary px-7 py-3 text-sm font-medium text-white transition hover:bg-[#b98f45]"
              >
                {dict?.header?.book}
                {isArabic ? <FaArrowLeft aria-hidden /> : <FaArrowRight aria-hidden />}
              </Link>

              <Link
                href={`/${locale}/about-us`}
                className="rounded-full border-2 border-secondary px-7 py-3 text-sm font-medium text-white transition hover:bg-secondary hover:text-white"
              >
                {dict?.hero?.GetKnowMme}
              </Link>
            </div>
          </IntroMotion>

          <IntroMotion
            isArabic={isArabic}
            type="image"
            className="order-1 flex justify-center lg:justify-start"
          >
            <div className="relative h-[480px] w-[360px] md:h-[620px] md:w-[460px]">
              {slides?.image && (
                <Image
                  src={slides.image}
                  alt={slides?.title || "Lawyer"}
                  width={460}
                  height={620}
                  priority
                  sizes="(max-width: 768px) 360px, 460px"
                  className="h-full w-full object-contain object-bottom"
                />
              )}
            </div>
          </IntroMotion>
        </div>
      </div>
    </section>
  );
}
"use client";
import Image from "next/image";
import Link from "next/link";
import { FaSnapchat } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";
import { useState } from "react";
import { useHome } from "@/hooks/useHome";
import LoadingCard from "./LoadingCard";
import ErrorState from "./ErrorState";
import { getDictionary } from "@/lib/getDictionary";

export default function Footer({ locale }) {
  const dict = getDictionary(locale);

  const footerLinks = [
    { title: dict?.header?.home, href: `/${locale}/` },
    { title: dict?.header?.about, href: `/${locale}/about-us` },
    { title: dict?.header?.articles, href: `/${locale}/articles` },
    { title: dict?.header?.contact, href: `/${locale}/contact` },
  ];

  const isArabic = locale === "ar";
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useHome();
  const informations = data?.informations || [];
  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorState />;

  const socialLinks = [
    { icon: FaFacebookF, href: informations?.facebook || "#" },
    { icon: FaInstagram, href: informations?.instagram || "#" },
    { icon: FaXTwitter, href: informations?.twitter || "#" },
    { icon: FaSnapchat, href: informations?.snapchat || "#" },
    { icon: FaTiktok, href: informations?.tiktok || "#" },
  ];

  return (
    <footer className="relative bg-[#00091F] mt-[0px] pt-[200px] text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div
          className="
    absolute
    left-1/2
    top-[-130px]
    z-20
    w-[90%]
    max-w-[1200px]
    -translate-x-1/2
    rounded-[20px]
    bg-[linear-gradient(180deg,#BA8632_0%,#543C16_151.68%)]
    px-8
    py-10
    text-center
    shadow-[0_30px_80px_rgba(0,0,0,0.35)]
    lg:px-14
    lg:py-8
  "
        >
          <p className="mb-3 text-custom18 font-semibold text-white/80">
            {dict?.cta?.title}
          </p>

          <h2 className="mx-auto mb-2 max-w-[760px] text-custom22 line-clamp-3 font-bold leading-relaxed text-white lg:text-custom24">
            {dict?.cta?.description}
          </h2>

          <Link
            href={`${locale}/contact`}
            className="w-[250px] mx-auto items-center rounded-full block bg-[#07111F] px-8 py-3 text-custom16 font-semibold text-white transition duration-300 hover:bg-[#0D1B30] my-2"
          >
            {dict?.cta?.button}
          </Link>
        </div>

        <div className="grid grid-cols-1 pt-10 gap-10 border-b border-white/10 pb-10 lg:grid-cols-4">
          <div className="text-center lg:text-start mt-[50px] lg:mt-[0px]">
            <Link
              href="/"
              className="text-custom28 block mb-2 font-bold text-white"
            >
              <Image
                src={informations?.logo || ""}
                alt={informations?.logo_alt || ""}
                width={100}
                height={100}
                priority
                sizes="120px"
                className="object-contain"
              />
            </Link>

            <div
              className="w-full lg:w-auto text-custom12 leading-relaxed text-white/85"
              dangerouslySetInnerHTML={{
                __html: informations?.small_about || "",
              }}
            />
          </div>

          {/* Site Links */}
          <div className="text-center lg:text-right">
            <h3 className="mb-4 text-custom16 font-bold text-secondary">
              {dict?.footer?.siteSections}
            </h3>

            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-custom14 text-white/85 transition hover:text-secondary"
                  >
                    {link?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center lg:text-right">
            <h3 className="mb-4 text-custom16 font-bold text-secondary">
              {dict?.footer?.customerService}
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="text-custom14 text-white/85 transition hover:text-secondary"
                >
                  {dict?.header?.privacyPolicy}
                </Link>
              </li>

              <li>
                <Link
                  href={`/${locale}/terms-conditions`}
                  className="text-custom14 text-white/85 transition hover:text-secondary"
                >
                  {dict?.header?.termsConditions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-start">
            <h3 className="mb-4 text-custom16 font-bold text-secondary">
              {dict?.footer?.contact}
            </h3>

            <ul className="space-y-3 text-custom14 text-white/90">
              <li className="flex items-center lg:justify-start justify-center gap-2">
                <Image
                  src="/images/f-1.png"
                  alt="phone"
                  width={20}
                  height={20}
                />{" "}
                {informations?.phone}
              </li>
              <li className="flex items-center  lg:justify-start justify-center gap-2">
                {" "}
                <Image
                  src="/images/f-2.png"
                  alt="phone"
                  width={20}
                  height={20}
                />{" "}
                {informations?.email}
              </li>
              <li className="flex items-center text-custom12  lg:justify-start justify-center gap-2">
                {" "}
                <Image
                  src="/images/f-3.png"
                  alt="phone"
                  width={20}
                  height={20}
                />{" "}
                {informations?.address}
              </li>
                            <li className="flex items-center text-custom12  lg:justify-start justify-center gap-2">
                {" "}
                <Image
                  src="/images/time.png"
                  alt="phone"
                  width={20}
                  height={20}
                />{" "}
                {informations?.working_hours}
              </li>
            </ul>

            <h3 className="mb-4 mt-6 text-custom14 font-bold text-secondary">
              {dict?.footer?.followUsOn}
            </h3>

            <div className="flex justify-center gap-3 lg:justify-start">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/5 text-secondary transition hover:bg-secondary hover:text-white"
                >
                  <Icon size={17} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`fixed bottom-6 z-[999] flex flex-col gap-3 ${
            isArabic ? "right-6" : "left-6"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary transition-all duration-300 hover:scale-110"
          >
            <Image src="/images/f-1.png" alt="calling" width={28} height={28} />
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="w-full max-w-[420px] rounded-[24px] border border-white/10 bg-[#07111F] p-6 text-center text-white shadow-2xl">
              <h3 className="mb-3 text-custom22 font-bold">تواصل معنا</h3>

              <p className="mb-6 text-custom15 leading-7 text-white/70">
                {dict?.footer?.chooseContactUsMethod}
              </p>

              <div className="space-y-3">
                <Link
                  href={`https://wa.me/${informations?.phone}`}
                  target="_blank"
                  className="block rounded-[12px] bg-[#25D366] px-6 py-3 text-custom16 font-semibold text-white"
                >
                  {dict?.footer?.contactUsWhatsApp}
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setOpen(false)}
                  className="block rounded-[12px] bg-secondary px-6 py-3 text-custom16 font-semibold text-white"
                >
                  {dict?.footer?.RequestConsultation}
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 text-custom14 text-white/60 hover:text-white"
              >
                {dict?.footer?.close}
              </button>
            </div>
          </div>
        )}

        <p className="py-5 text-center text-custom14 text-white/75">
          © 2026 {dict?.footer?.copyright}
        </p>
      </div>
    </footer>
  );
}

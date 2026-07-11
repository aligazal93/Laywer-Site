"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChangeLanguage from "./ChangeLanguage";
import { FaBars, FaXmark } from "react-icons/fa6";

export default function HeaderClient({ locale, dict, info }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isArabic = locale === "ar";

  const logoSrc = info?.logo || "/images/logo-1.png";
  const logoAlt = isArabic
    ? "شعار مكتب المحامي علي سعيد الشامسي"
    : "Ali Saeed Al Shamsi Law Firm Logo";

  const navLinks = [
    { title: dict?.header?.home, href: `/${locale}/` },
    { title: dict?.header?.about, href: `/${locale}/about-us` },
    { title: dict?.header?.articles, href: `/${locale}/articles` },
    { title: dict?.header?.contact, href: `/${locale}/contact` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[999998] bg-black/50 transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <header
        className={`start-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "fixed bg-primary/80 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "absolute bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-all duration-500 ${
            scrolled ? "py-0" : "py-0"
          }`}
        >
          <Link
            href={`/${locale}`}
            aria-label={
              isArabic ? "الذهاب إلى الصفحة الرئيسية" : "Go to homepage"
            }
            className="relative block h-[90px] w-[150px]"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={150}
              height={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={60}
              className="h-[120px] w-full object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            <nav
              aria-label={isArabic ? "القائمة الرئيسية" : "Main navigation"}
              className="hidden items-center gap-8 lg:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.title}
                  className="text-sm font-[700] text-white/85 transition hover:text-[#D3AA60]"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ChangeLanguage />

              <Link
                href={`/${locale}/contact`}
                aria-label={dict?.header?.book}
                className="hidden rounded-[14px] bg-secondary px-6 py-3 text-custom14 font-[700] text-white transition hover:bg-[#b98f45] sm:inline-flex"
              >
                {dict?.header?.book}
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={isArabic ? "فتح القائمة" : "Open menu"}
                aria-expanded={open}
                className="flex items-center justify-center text-white transition hover:text-secondary lg:hidden"
              >
                <FaBars className="text-custom28" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed top-0 z-[999999] h-full w-[80%] max-w-[320px] overflow-hidden bg-primary p-5 pt-[40px] text-white transition-transform duration-300 lg:hidden ${
          isArabic ? "right-0" : "left-0"
        } ${
          open
            ? "translate-x-0"
            : isArabic
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            aria-label={
              isArabic ? "الذهاب إلى الصفحة الرئيسية" : "Go to homepage"
            }
            className="relative block h-[56px] w-[120px]"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={120}
              height={56}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-full w-full object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={isArabic ? "إغلاق القائمة" : "Close menu"}
            className="text-white transition hover:text-secondary"
          >
            <FaXmark className="text-custom26" aria-hidden />
          </button>
        </div>

        <nav
          aria-label={isArabic ? "قائمة الجوال" : "Mobile navigation"}
          className="mt-10"
        >
          <ul>
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-label={item.title}
                  className="my-4 block text-custom14 font-[500] text-white transition-all duration-300 hover:text-secondary"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={`/${locale}/contact`}
          aria-label={dict?.header?.book}
          onClick={() => setOpen(false)}
          className="mt-8 inline-flex w-full justify-center rounded-[14px] bg-secondary px-6 py-3 text-custom14 font-[700] text-white transition hover:bg-[#b98f45]"
        >
          {dict?.header?.book}
        </Link>
      </aside>
    </>
  );
}

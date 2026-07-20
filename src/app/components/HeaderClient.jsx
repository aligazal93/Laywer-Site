"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChangeLanguage from "./ChangeLanguage";

const LOGO_WIDTH = 150;
const LOGO_HEIGHT = 90;
const LOGO_QUALITY = 55;

export default function HeaderClient({ locale, dict, info }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isArabic = locale === "ar";

  const logoSrc = info?.logo || "/images/logo-1.png";

  const logoAlt = isArabic
    ? "شعار مكتب المحامي علي سعيد الشامسي"
    : "Ali Saeed Al Shamsi Law Firm Logo";

  const navLinks = [
    {
      title: dict?.header?.home,
      href: `/${locale}`,
    },
    {
      title: dict?.header?.about,
      href: `/${locale}/about-us`,
    },
    {
      title: dict?.header?.articles,
      href: `/${locale}/articles`,
    },
    {
      title: dict?.header?.contact,
      href: `/${locale}/contact`,
    },
  ];

  /*
   * تحديث شكل الهيدر عند التمرير.
   * requestAnimationFrame يقلل تنفيذ التحديثات أثناء الـScroll.
   */
  useEffect(() => {
    let animationFrameId = null;

    const updateHeader = () => {
      animationFrameId = null;

      const shouldBeScrolled = window.scrollY > 80;

      setScrolled((currentValue) =>
        currentValue === shouldBeScrolled
          ? currentValue
          : shouldBeScrolled
      );
    };

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  /*
   * منع تمرير الصفحة عند فتح قائمة الجوال،
   * وإغلاق القائمة بزر Escape.
   */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      {/* خلفية قائمة الجوال */}
      <button
        type="button"
        aria-label={
          isArabic ? "إغلاق قائمة الجوال" : "Close mobile menu"
        }
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[999998] bg-black/50 transition-opacity duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* الهيدر */}
      <header
        className={`start-0 top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "fixed bg-primary/90 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md"
            : "absolute bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6">
          {/* اللوجو الرئيسي */}
          <Link
            href={`/${locale}`}
            aria-label={
              isArabic
                ? "الذهاب إلى الصفحة الرئيسية"
                : "Go to homepage"
            }
            className="relative block h-[72px] w-[120px] shrink-0 lg:h-[90px] lg:w-[150px]"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              quality={LOGO_QUALITY}
              loading="eager"
              className="h-full w-full object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* قائمة الكمبيوتر */}
            <nav
              aria-label={
                isArabic ? "القائمة الرئيسية" : "Main navigation"
              }
              className="hidden items-center gap-8 lg:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.title}
                  className="text-sm font-[700] text-white/85 transition-colors duration-200 hover:text-[#D3AA60]"
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
                className="hidden rounded-[14px] bg-secondary px-6 py-3 text-custom14 font-[700] text-white transition-colors duration-200 hover:bg-[#b98f45] sm:inline-flex"
              >
                {dict?.header?.book}
              </Link>

              {/* زر فتح قائمة الجوال */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={
                  isArabic ? "فتح القائمة" : "Open menu"
                }
                aria-expanded={open}
                aria-controls="mobile-navigation"
                className="flex h-10 w-10 items-center justify-center text-white transition-colors duration-200 hover:text-secondary lg:hidden"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7"
                >
                  <path
                    d="M4 7H20M4 12H20M4 17H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* قائمة الجوال */}
      <aside
        id="mobile-navigation"
        aria-hidden={!open}
        className={`fixed top-0 z-[999999] h-full w-[80%] max-w-[320px] overflow-y-auto bg-primary p-5 pt-8 text-white shadow-2xl transition-transform duration-300 lg:hidden ${
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
          {/* نفس أبعاد الصورة الداخلية لضمان إعادة استخدام الكاش */}
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            aria-label={
              isArabic
                ? "الذهاب إلى الصفحة الرئيسية"
                : "Go to homepage"
            }
            className="relative block h-[72px] w-[120px] shrink-0"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              quality={LOGO_QUALITY}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </Link>

          {/* زر إغلاق قائمة الجوال */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={
              isArabic ? "إغلاق القائمة" : "Close menu"
            }
            className="flex h-10 w-10 items-center justify-center text-white transition-colors duration-200 hover:text-secondary"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav
          aria-label={
            isArabic ? "قائمة الجوال" : "Mobile navigation"
          }
          className="mt-10"
        >
          <ul>
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-label={item.title}
                  className="my-4 block py-1 text-custom14 font-[500] text-white transition-colors duration-200 hover:text-secondary"
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
          className="mt-8 inline-flex w-full justify-center rounded-[14px] bg-secondary px-6 py-3 text-custom14 font-[700] text-white transition-colors duration-200 hover:bg-[#b98f45]"
        >
          {dict?.header?.book}
        </Link>
      </aside>
    </>
  );
}
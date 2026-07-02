"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChangeLanguage from "./ChangeLanguage";
import { getDictionary } from "@/lib/getDictionary";
import { FaBars } from "react-icons/fa";

export default function Header({ locale }) {
  const dict = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isArabic = locale === "ar";

  const navLinks = [
    { title: dict.header.home, href: `/${locale}/` },
    { title: dict.header.about, href: `/${locale}/about-us` },
    { title: dict.header.articles, href: `/${locale}/articles` },
    { title: dict.header.contact, href: `/${locale}/contact` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[999998] transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
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
            scrolled ? "py-4" : "py-6"
          }`}
        >
          <Link href="/" className="text-white text-lg font-semibold">
            <Image
              src="/images/logo-1.png"
              alt="logo"
              width={70}
              height={20}
              className=" object-cover"
            />
          </Link>

          <div className="flex items-center gap-4">
            <nav className="sm:hidden hidden items-center gap-8 md:flex mx-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm text-white/85 transition font-[700] hover:text-[#D3AA60]"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ChangeLanguage />

              <Link
                href={`/${locale}/contact`}
                className="bg-secondary px-6 py-3 rounded-[14px] text-custom14 font-[700] text-white transition hover:bg-[#b98f45]"
              >
                {dict.header.book}
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex xl:hidden lg:flex justify-end items-center text-secondary text-custom28 cursor-pointer"
              >
                <FaBars className="text-white text-custom28 transition duration-300 cursor-pointer hover:text-secondary lg:hidden flex" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed xl:hidden top-0 ${
          isArabic ? "right-0" : "left-0"
        } h-full w-[80%] max-w-[320px] pt-[50px] bg-primary text-white transform transition-transform duration-300 z-[999999] p-5 overflow-hidden ${
          open
            ? "translate-x-0"
            : isArabic
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        <Link href={`/${locale}`}>
          <Image
            src="/images/logo-1.png"
            alt="logo"
            width={100}
            height={50}
            className="w-[100px] h-[50px]"
          />
        </Link>

        <ul className="mt-[40px]">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-custom14 block my-4 font-[400] transition-all duration-500 hover:text-secondary text-white"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

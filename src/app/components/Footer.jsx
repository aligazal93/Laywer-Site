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

import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const socialLinks = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaXTwitter, href: "#" },
  { icon: FaSnapchat, href: "#" },
  { icon: FaTiktok, href: "#" },
];

const footerLinks = [
  { title: "الرئيسية", href: "#home" },
  { title: "نبذة عني", href: "#about" },
  { title: "المقالات", href: "#articles" },
  { title: "تواصل معي", href: "#contact" },
];

export default function Footer({ locale }) {
  const isArabic = locale === "ar";
  const [open, setOpen] = useState(false);

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
            بداية خطوتك القانونية
          </p>

          <h2 className="mx-auto mb-2 max-w-[760px] text-custom22 font-bold leading-relaxed text-white lg:text-custom30">
            لأن كل قرار قانوني مهم، تبدأ أفضل الحلول بحوار واضح.
          </h2>

          <p className="mx-auto mb-4 max-w-[620px] text-custom16 leading-8 text-white/85">
            إذا كنت تبحث عن استشارة قانونية تعتمد على الفهم الدقيق، والرؤية
            الواضحة، والالتزام المهني، يمكنك حجز موعد لبدء مناقشة حالتك والحصول
            على التوجيه القانوني المناسب.
          </p>

          <Link
            href="#contact"
            className="w-[250px] mx-auto items-center rounded-full block bg-[#07111F] px-8 py-3 text-custom16 font-semibold text-white transition duration-300 hover:bg-[#0D1B30] my-2"
          >
            تواصل الآن
          </Link>
        </div>

        <div className="grid grid-cols-1 pt-10 gap-10 border-b border-white/10 pb-10 lg:grid-cols-4">
          <div className="text-center lg:text-start mt-[50px] lg:mt-[0px]">
            <Link
              href="/"
              className="text-custom28 block mb-4 font-bold text-white"
            >
              اللـوجـو
            </Link>

            <p className="w-full lg:max-w-[300px] text-custom16 leading-7 text-white/85">
              بيتك يبدأ بالتفاصيل المناسبة نوفر مجموعة متنوعة من الأثاث
              والمفروشات والإضاءة بتصميمات تجمع بين الجودة والراحة لتناسب مختلف
              الاحتياجات والأذواق.
            </p>
          </div>

          {/* Site Links */}
          <div className="text-center lg:text-right">
            <h3 className="mb-4 text-custom16 font-bold text-secondary">
              أقسام الموقع
            </h3>

            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-custom14 text-white/85 transition hover:text-secondary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center lg:text-right">
            <h3 className="mb-4 text-custom16 font-bold text-secondary">
              خدمة العملاء
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-custom14 text-white/85 transition hover:text-secondary"
                >
                  سياسة الخصوصية
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-custom14 text-white/85 transition hover:text-secondary"
                >
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-start">
            <h3 className="mb-4 text-custom16 font-bold text-secondary">
              تواصل معنا
            </h3>

            <ul className="space-y-3 text-custom14 text-white/90">
              <li className="flex items-center lg:justify-start justify-center gap-2">
                <Image
                  src="/images/f-1.png"
                  alt="phone"
                  width={20}
                  height={20}
                />{" "}
                01036182516{" "}
              </li>
              <li className="flex items-center  lg:justify-start justify-center gap-2">
                {" "}
                <Image
                  src="/images/f-2.png"
                  alt="phone"
                  width={20}
                  height={20}
                />{" "}
                info@Globalinx.com
              </li>
              <li className="flex items-center  lg:justify-start justify-center gap-2">
                {" "}
                <Image
                  src="/images/f-3.png"
                  alt="phone"
                  width={20}
                  height={20}
                />{" "}
                الحي الدولي العاشر بجوار كارفور المعادي
              </li>
            </ul>

            <h3 className="mb-4 mt-6 text-custom14 font-bold text-secondary">
              تابعنا على
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
                اختر طريقة التواصل المناسبة لك
              </p>

              <div className="space-y-3">
                <Link
                  href="https://wa.me/201012345678"
                  target="_blank"
                  className="block rounded-[12px] bg-[#25D366] px-6 py-3 text-custom16 font-semibold text-white"
                >
                  تواصل عبر واتساب
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setOpen(false)}
                  className="block rounded-[12px] bg-secondary px-6 py-3 text-custom16 font-semibold text-white"
                >
                  طلب استشارة
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 text-custom14 text-white/60 hover:text-white"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

        <p className="py-5 text-center text-custom14 text-white/75">
          © 2026 علي سعيد الشامسي جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}

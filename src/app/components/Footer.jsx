import Link from "next/link";
import { FaSnapchat } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

import { SiSnapchat } from "react-icons/si";

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
  { title: "مجالات الممارسة", href: "#services" },
  { title: "المقالات", href: "#articles" },
  { title: "تواصل معي", href: "#contact" },
];

export default function Footer({ locale }) {
  const isArabic = locale === "ar";
    
  return (
    <footer className="relative bg-[#0A1F3B] mt-[0px] pt-[200px] text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto w-[90%] lg:w-[70%] left-0 right-0  rounded-[12px] bg-[url('/images/layer-3.png')] bg-cover bg-center absolute top-[-100px] px-8 py-8 text-center">
          <p className="mb-2 text-custom14 font-semibold text-white/75">
            بداية خطوتك القانونية
          </p>

          <h2 className="mx-auto mb-3 text-custom16 lg:text-custom28 font-bold leading-relaxed text-white md:text-custom30">
            لأن كل قرار قانوني مهم، تبدأ أفضل الحلول بحوار واضح.
          </h2>

          <p className="mx-auto mb-5 w-full lg:w-[50%] text-custom16 leading-6 text-white/80">
            تواصل معي للحصول على استشارة قانونية واضحة تساعدك على فهم موقفك
            واتخاذ قرارك بثقة.
          </p>

          <Link
            href="#contact"
            className="inline-flex rounded-full bg-primary px-8 py-3 text-custom16 font-semibold text-white transition hover:bg-[#0b213b]"
          >
            تواصل الآن
          </Link>
        </div>

        <div className="mt-10 text-center">
          <h3 className="mb-6 text-custom18 font-bold text-white">اللوجو</h3>

          <div className="mb-8 flex justify-center gap-3">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#061321] text-secondary transition hover:bg-secondary hover:text-white"
                >
                  <Icon size={16} />
                </Link>
              );
            })}
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-7">
            {footerLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-custom14 text-white/80 transition hover:text-secondary"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-5   md:flex-row">
          <p className="text-[#95AAC7] text-custom14 font-[700]"> © 2026 علي سعيد الشامسي. جميع الحقوق محفوظة.</p>

          <div className="flex gap-6">
            <Link href="#" className="text-[#95AAC7] text-custom14 font-[700] hover:text-secondary">
              سياسة الخصوصية
            </Link>
            <Link href="#" className="text-[#95AAC7] text-custom14 font-[700] hover:text-secondary">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
import ContactForm from "@/app/components/ContactForm";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default async function ContactUs({ params }) {
  const { locale } = await params;

  return (
    <section className="bg-primary px-5 py-[160px]">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <span className="mb-4 block text-custom16 font-bold text-secondary">
            تواصل معي
          </span>

          <h1 className="text-[34px] font-bold text-white md:text-[44px]">
            حديث مباشر، دون وسيط.
          </h1>
        </div>

        <div className="grid grid-cols-12 items-stretch gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="h-full rounded-[24px] bg-[#00091F] p-6 md:p-8">
              <ContactForm />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="h-full rounded-[24px] bg-[#00091F] p-6 md:p-8">
              <div className="space-y-9 text-right">
                <InfoItem
                  icon="/images/address.png"
                  title="العنوان"
                  text="الرياض-جدة - المدينة - المملكة العربية السعودية"
                />

                <InfoItem
                  icon="/images/envelop.png"
                  title="البريد الإلكتروني"
                  text="adviser.motaz@gfsksa.com"
                />

                <InfoItem
                  icon="/images/phone.png"
                  title="الهاتف"
                  text="00966554117888"
                  dir="ltr"
                />

                <InfoItem
                  icon="/images/time.png"
                  title="أوقات تواجدنا"
                  text="الأحد - الخميس: ٩:٠٠ ص - ٥:٠٠ م"
                />
              </div>

              <div className="mt-9 border-t border-white/10 pt-7 text-start">
                <h3 className="text-custom16 font-bold text-white">
                  تابعنا على وسائل التواصل
                </h3>

                <ul className="mt-5 flex items-center justify-start gap-3">
                  <SocialLink label="Instagram">
                    <FaInstagram size={18} />
                  </SocialLink>

                  <SocialLink label="Snapchat">
                    <FaSnapchatGhost size={18} />
                  </SocialLink>

                  <SocialLink label="TikTok">
                    <FaTiktok size={18} />
                  </SocialLink>

                  <SocialLink label="X">
                    <RiTwitterXFill size={18} />
                  </SocialLink>
                </ul>
              </div>
            </div>
          </div>

<div className="col-span-12">
  <div className="mt-8 mb-10 overflow-hidden rounded-3xl">
    <iframe
      title="Abu Dhabi Location"
      src="https://www.google.com/maps?q=Abu%20Dhabi,%20United%20Arab%20Emirates&z=13&output=embed"
      className="h-[300px] w-full border-0 md:h-[400px]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>
</div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon, title, text, dir }) {
  return (
    <div className="flex items-center justify-start gap-5 text-start">
      <Image
        src={icon}
        alt=""
        width={34}
        height={34}
        className=" object-contain"
      />
      <div>
        <h3 className="text-custom16 font-bold text-white">{title}</h3>
        <p dir={dir} className="mt-2 text-custom14 leading-7 text-white/75">
          {text}
        </p>
      </div>
    </div>
  );
}

function SocialLink({ children, label }) {
  return (
    <li>
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#0D3158] text-secondary transition hover:bg-secondary hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

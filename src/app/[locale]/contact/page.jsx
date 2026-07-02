import ContactForm from "@/app/components/ContactForm";
import Informations from "./components/Informations";
import ContactMap from "./components/ContactMap";
import { getDictionary } from "@/lib/getDictionary";

export default async function ContactUs({ params }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return (
    <section className="bg-primary px-5 py-[160px]">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <span className="mb-4 block text-custom16 font-bold text-secondary">
           {dict.contactForm.badge}
          </span>

          <h1 className="text-[34px] font-bold text-white md:text-[44px]">
            {dict.contactForm?.title}
          </h1>
        </div>

        <div className="grid grid-cols-12 items-stretch gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="h-full rounded-[24px] bg-[#00091F] p-6 md:p-8">
              <ContactForm locale={locale} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <Informations locale={locale} />
          </div>

          <div className="col-span-12">
            <div className="mt-8 mb-10 overflow-hidden rounded-3xl">
              <ContactMap locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

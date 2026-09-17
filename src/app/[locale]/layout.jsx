import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

const SUPPORTED_LOCALES = ["ar", "en"];

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // لا ننشئ Metadata لمسار لغة غير صحيح
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return {};
  }

  const isArabic = locale === "ar";

  return {
    title: {
      default: isArabic
        ? "علي سعيد الشامسي | محامي في الإمارات"
        : "Ali Saeed Al Shamsi | Lawyer & Legal Consultant",
      template: isArabic
        ? "%s | علي سعيد الشامسي"
        : "%s | Ali Saeed Al Shamsi",
    },

    description: isArabic
      ? "الموقع الرسمي للمحامي والمستشار علي سعيد الشامسي في دولة الإمارات"
      : "The official website of lawyer and legal consultant Ali Saeed Al Shamsi in the UAE.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}) {
  const { locale } = await params;

  // السماح فقط بالعربية والإنجليزية
  // أي مسار مثل /&/ أو أي locale آخر سيعطي 404
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";

  return (
    <div
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Header locale={locale} />

      {children}

      <Footer locale={locale} />

      <ScrollToTop />

      <Toaster
        position="top-center"
        richColors
      />
    </div>
  );
}

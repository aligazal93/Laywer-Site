import { Toaster } from "sonner";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

export async function generateMetadata({ params }) {
  const { locale } = await params;


  const isArabic = locale === "ar";

  return {
    title: {
      default: isArabic
        ? "علي سعيد الشامسي | محامٍ ومستشار قانوني"
        : "Ali Saeed Al Shamsi | Lawyer & Legal Consultant",

      template: isArabic
        ? "%s | علي سعيد الشامسي"
        : "%s | Ali Saeed Al Shamsi",
    },

    description: isArabic
      ? "الموقع الرسمي للمحامي والمستشار القانوني علي سعيد الشامسي في دولة الإمارات."
      : "The official website of lawyer and legal consultant Ali Saeed Al Shamsi in the UAE.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}) {
  const { locale } = await params;

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
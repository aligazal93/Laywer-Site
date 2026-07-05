import { Toaster } from "sonner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";
import "../globals.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return locale === "ar"
    ? {
        title: "علي سعيد الشامسي",
        description: "محامي ومستشار قانوني في الإمارات",
      }
    : {
        title: "Ali Saeed Al Shamsi",
        description: "Professional Lawyer in UAE",
      };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <ScrollToTop />
      <Header locale={locale} />
      <Toaster richColors position="top-center" className="text-center" />
      {children}
      <Footer locale={locale} />
    </div>
  );
}

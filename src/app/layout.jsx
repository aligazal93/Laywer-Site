import TanstackProvider from "@/providers/TanstackProvider";
import "./globals.css";
import localFont from "next/font/local";

const ibmPlexArabic = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexSansArabic-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-arabic",
});

export const metadata = {
  title: "Lawyer Site",
  description: "Lawyer Site Website",
};

export default function RootLayout({ children }) {
  return (
    <html className={ibmPlexArabic.variable}>
      <body className="font-sans bg-[#000511]">
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}

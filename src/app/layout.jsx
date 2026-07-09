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
  ],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://lawyer-front.test-my-projects.com"),

  title: {
    default: "Ali Saeed Al Shamsi",
    template: "%s | Ali Saeed Al Shamsi",
  },

  description: "Professional Lawyer and Legal Consultant in the UAE.",

  keywords: ["Lawyer", "Legal Consultant", "UAE Lawyer", "Abu Dhabi Lawyer"],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className={ibmPlexArabic.variable}>
      <body className="font-sans bg-[#000511]">
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}

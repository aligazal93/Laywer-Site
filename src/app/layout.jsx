import TanstackProvider from "@/providers/TanstackProvider";
import "./globals.css";

import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";

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

const siteUrl = "https://alilaw.ae";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Ali Saeed Al Shamsi | Lawyer & Legal Consultant in UAE",
    template: "%s | Ali Saeed Al Shamsi",
  },

  description:
    "Ali Saeed Al Shamsi is a professional lawyer and legal consultant in the UAE, providing legal consultations and legal services in Abu Dhabi and across the UAE.",

  keywords: [
    "Ali Saeed Al Shamsi",
    "Lawyer UAE",
    "Legal Consultant UAE",
    "UAE Lawyer",
    "Abu Dhabi Lawyer",
    "Legal Services UAE",
    "محامي في الإمارات",
    "مستشار قانوني في الإمارات",
    "محامي في أبوظبي",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "Ali Saeed Al Shamsi",
    title: "Ali Saeed Al Shamsi | Lawyer & Legal Consultant in UAE",
    description:
      "Professional lawyer and legal consultant in the UAE, providing legal consultations and legal services.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Saeed Al Shamsi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ali Saeed Al Shamsi | Lawyer & Legal Consultant in UAE",
    description: "Professional lawyer and legal consultant in the UAE.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className={ibmPlexArabic.variable}>
      <body className="font-sans bg-[#000511]">
        <TanstackProvider>{children}</TanstackProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
import { cache } from "react";

import Intro from "../components/Intro";
import ValuesSection from "../components/ValuesSection";
import PracticeAreas from "../components/PracticeAreas";
import LegalProcess from "../components/LegalProcess";
import ArticlesSection from "../components/ArticlesSection";


import { getHomeApi } from "@/services/homeService";

import {
  buildSeoMetadata,
  extractSeoDetails,
} from "@/lib/seo";
import SeoSchema from "../components/seo/SeoSchema";

const getHomeData = cache(async (locale) => {
  return await getHomeApi(locale);
});

export async function generateMetadata({ params }) {
  const { locale } = await params;

  try {
    const homeData = await getHomeData(locale);
    const seoDetails = extractSeoDetails(homeData);

    return buildSeoMetadata({
      seoDetails,
      locale,
      pathname: "",

      fallbackTitle:
        locale === "ar"
          ? "علي سعيد الشامسي | محامٍ ومستشار قانوني"
          : "Ali Saeed Al Shamsi | Lawyer & Legal Consultant",

      fallbackDescription:
        locale === "ar"
          ? "الموقع الرسمي للمحامي والمستشار القانوني علي سعيد الشامسي في دولة الإمارات."
          : "The official website of lawyer and legal consultant Ali Saeed Al Shamsi in the UAE.",

      type: "website",
    });
  } catch (error) {
    return buildSeoMetadata({
      locale,
      pathname: "",

      fallbackTitle:
        locale === "ar"
          ? "علي سعيد الشامسي | محامٍ ومستشار قانوني"
          : "Ali Saeed Al Shamsi | Lawyer & Legal Consultant",

      fallbackDescription:
        locale === "ar"
          ? "الموقع الرسمي للمحامي والمستشار القانوني علي سعيد الشامسي في دولة الإمارات."
          : "The official website of lawyer and legal consultant Ali Saeed Al Shamsi in the UAE.",
    });
  }
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  const homeData = await getHomeData(locale);
  const seoDetails = extractSeoDetails(homeData);

  return (
    <>
      <SeoSchema schema={seoDetails?.schema} />

      <main>
        <Intro
          locale={locale}
          data={homeData}
        />

        <ValuesSection locale={locale} />


        <PracticeAreas locale={locale} />

        <LegalProcess locale={locale} />

        <ArticlesSection locale={locale} />
      </main>
    </>
  );
}
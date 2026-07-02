import React from "react";
import Header from "../components/Header";
import Intro from "../components/Intro";
import ValuesSection from "../components/ValuesSection";
import AboutSection from "../components/AboutSection";
import PracticeAreas from "../components/PracticeAreas";
import LegalProcess from "../components/LegalProcess";
import ArticlesSection from "../components/ArticlesSection";

export default async function HomePage({ params }) {
  const { locale } = await params;
  return (
    <>
      <Intro locale={locale} />
      <ValuesSection locale={locale} />
      {/* <AboutSection locale={locale} /> */}
      <PracticeAreas locale={locale} />
      <LegalProcess locale={locale} />
      <ArticlesSection locale={locale} />
    </>
  );
}

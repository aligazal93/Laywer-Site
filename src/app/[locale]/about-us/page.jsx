import React from "react";
import AboutHero from "./components/AboutHero";
import ValuesSection from "@/app/components/ValuesSection";
import MyCv from "./components/MyCv";
import MyWord from "./components/MyWord";
import LetsStart from "./components/LetsStart";

export default async function AboutUsPage({ locale }) {
  return (
    <>
      <AboutHero locale={locale} />
      <ValuesSection locale={locale} />
      <MyCv locale={locale} />
      <MyWord locale={locale} />
      <LetsStart locale={locale} />
    </>
  );
}

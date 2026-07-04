import { getDictionary } from "@/lib/getDictionary";
import { getHomeApi } from "@/services/homeService";
import HeaderClient from "./HeaderClient";

export default async function Header({ locale }) {
  const dict = getDictionary(locale);
  const data = await getHomeApi(locale);

  const info = data?.data?.informations || data?.informations || {};

  return <HeaderClient locale={locale} dict={dict} info={info} />;
}
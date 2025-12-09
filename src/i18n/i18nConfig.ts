import { ELocale } from "@/types/eLocale";

const i18nConfig = {
  locales: [ELocale.ARABIC, ELocale.ENGLISH],
  defaultLocale: ELocale.ARABIC,
  localeCookie: "lang",
  noPrefix: true,
};

export const getDirection = (locale: string): "rtl" | "ltr" => {
  return locale === ELocale.ARABIC ? "rtl" : "ltr";
};

export default i18nConfig;

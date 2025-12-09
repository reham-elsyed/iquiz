"use client";

import { I18nextProvider } from "react-i18next";
import { Resource, createInstance } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import i18nConfig from "./i18nConfig";
import initTranslations from "@/app/i18n";

export interface ITranslationsProvider {
  children: React.ReactNode;
  namespaces: string[];
  resources?: Resource;
}

export default function TranslationsProvider({ children, namespaces, resources }: Readonly<ITranslationsProvider>) {
  const [i18nInstance, setI18nInstance] = useState<any>(null);

  useEffect(() => {
    const initI18n = async () => {
      const instance = createInstance();
      const { initReactI18next } = await import("react-i18next");
      instance.use(initReactI18next);
      const { i18n } = await initTranslations(i18nConfig.defaultLocale, namespaces, instance, resources);

      const lang = (getCookie(i18nConfig.localeCookie) as string) ?? i18nConfig.defaultLocale;
      await i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = i18n.dir(lang);

      // Listen for language changes
      i18n.on('languageChanged', (lng) => {
        document.documentElement.lang = lng;
        document.documentElement.dir = i18n.dir(lng);
      });

      setI18nInstance(i18n);
    };

    initI18n();
  }, [namespaces, resources]);

  if (!i18nInstance) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}

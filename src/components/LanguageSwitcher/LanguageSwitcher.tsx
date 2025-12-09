"use client";

import { useTranslation } from "react-i18next";
import { setCookie } from "cookies-next";
import { ELocale } from "@/types/eLocale";
import i18nConfig from "@/i18n/i18nConfig";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language as ELocale;

    const handleLanguageChange = async (newLocale: ELocale) => {
        // Save to cookie
        setCookie(i18nConfig.localeCookie, newLocale, {
            maxAge: 365 * 24 * 60 * 60, // 1 year
            path: "/",
        });

        // Change language
        await i18n.changeLanguage(newLocale);

        // Update document attributes
        document.documentElement.lang = newLocale;
        document.documentElement.dir = i18n.dir(newLocale);

        // Reload to apply changes properly
        window.location.reload();
    };

    const toggleLanguage = () => {
        const newLocale = currentLocale === ELocale.ARABIC ? ELocale.ENGLISH : ELocale.ARABIC;
        handleLanguageChange(newLocale);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
            aria-label="Switch language"
        >
            <Globe className="w-5 h-5" />
            <span className="font-medium">
                {currentLocale === ELocale.ARABIC ? "English" : "العربية"}
            </span>
        </button>
    );
}

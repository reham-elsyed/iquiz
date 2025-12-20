import { getRequestConfig } from 'next-intl/server';
import i18nConfig from './i18nConfig';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !i18nConfig.locales.includes(locale as any)) {
        locale = i18nConfig.defaultLocale;
    }

    const load_messages = async (filename: string) => {
        try {
            return (await import(`./${locale}/${filename}.json`)).default;
        } catch (error) {
            console.error(`Failed to load messages for ${locale}/${filename}`, error);
            return {};
        }
    }

    return {
        messages: {
            ...(await load_messages('common')),
            auth: await load_messages('auth'),
            dashboard: await load_messages('dashboard'),
            flashCard: await load_messages('flashCard'),
            navigation: await load_messages('navigation'),
            quiz: await load_messages('quiz')
        }
    };
});

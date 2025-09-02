import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json' with { type: 'json' };
import ru from '../locales/ru.json' with { type: 'json' };

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  });

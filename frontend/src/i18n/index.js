import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales/index.js';

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

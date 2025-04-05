import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import axios from "axios";

import enTranslations from "./locales/en.json";
import ruTranslations from "./locales/ru.json";

// const loadServerTranslations = async (lang) => {
//   try {
//     const response = await axios.get(`/api/translations/${lang}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Ошибка при загрузке переводов для ${lang}:`, error);
//     return {};
//   }
// };

const initI18n = async () => {
  // const enServerTranslations = await loadServerTranslations("en");
  // const ruServerTranslations = await loadServerTranslations("ru");

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          ...enTranslations,
        },
      },
      ru: {
        translation: {
          ...ruTranslations,
        },
      },
    },
    lng: "ru",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;

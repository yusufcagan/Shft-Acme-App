import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import translationTr from './tr.json';
import translationEn from './en.json';

const resources = {
  en: {
    translation: translationEn,
  },
  tr: {
    translation: translationTr,
  },
};

const initI18n = async () => {
  let savedLanguage = RNLocalize.getLocales()[0]?.languageCode;

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;

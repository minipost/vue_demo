import Vue from "vue";
import VueI18n from "vue-i18n";

export interface Translations {
  'HOME'?: string;
  'ABOUT'?: string;
  'ABOUT.SOME_TEXT'?: string;
  'SOME_TEXT'?: string;
  'SOME_OTHER_TEXT': string;
  'LANG'?: string;
  'SETTINGS'?: string;
  'LOGIN'?: string;
  'TIME'?: string;
  'PLEASE_FILL_OUT_THIS_FIELD'?: string;
}
interface Messages {
  en: Translations;
  da: Translations;
}
Vue.use(VueI18n);
const messages = {
  en: {
    'HOME': "home",
    'ABOUT': "about",
    'ABOUT.SOME_TEXT': "some about text",
    'SOME_TEXT': "Some text",
    'SOME_OTHER_TEXT': "Some other text",
    'LANG': "lang",
    'SETTINGS': "settings",
    'LOGIN': "login",
    'TIME': "time",
    'PLEASE_FILL_OUT_THIS_FIELD':"please fill out this field"
  },
  da: {
    'HOME': "hjem",
    'ABOUT': "om",
    'ABOUT.SOME_TEXT': "noget text om",
    'SOME_TEXT': "Noget text",
    'SOME_OTHER_TEXT': "Noget andet text",
    'LANG': "sprog",
    'SETTINGS': "indstillinger",
    'LOGIN': "login",
    'TIME': "tid",
    'PLEASE_FILL_OUT_THIS_FIELD':"udfyld venligst dette felt"

  }
};

const i18n = new VueI18n({
  locale: "en", // set locale
  fallbackLocale: "es", // set fallback locale
  messages // set locale messages
});

export default i18n;

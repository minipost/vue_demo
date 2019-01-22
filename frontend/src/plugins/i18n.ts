import Vue from "vue";
import VueI18n from "vue-i18n";

interface Translations {
  HOME?: string;
  ABOUT?: string;
  SOME_TEXT?: string;
  SOME_OTHER_TEXT: string;
  LANG?: string;
}
interface Messages {
  en: Translations;
  da: Translations;
}
Vue.use(VueI18n);
const messages = {
  en: {
    HOME: "home",
    ABOUT: "about",
    SOME_TEXT: "Some text",
    SOME_OTHER_TEXT: "Some other text",
    LANG: "lang",
  },
  da: {
    HOME: "hjem",
    ABOUT: "om",
    SOME_TEXT: "Noget text",
    SOME_OTHER_TEXT: "Noget andet text",
    LANG: "sprog",

  }
};

const i18n = new VueI18n({
  locale: "en", // set locale
  fallbackLocale: "es", // set fallback locale
  messages // set locale messages
});

export default i18n;

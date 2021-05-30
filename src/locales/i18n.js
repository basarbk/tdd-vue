import { createI18n } from "vue-i18n";
import en from "./en.json";
import tr from "./tr.json";

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
    tr,
  },
});

export default i18n;

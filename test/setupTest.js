import "@testing-library/jest-dom";
import i18n from "../src/locales/i18n";

afterEach(() => {
  i18n.global.locale = "en";
});

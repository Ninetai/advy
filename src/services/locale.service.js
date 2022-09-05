export const AVAILABLE_LANGUAGES = {
    ru: 'Русский',
    en: 'English',
    pl: 'Polski',
};
export const DEFAULT_LANGUAGE = "ru";

export const detectBrowserLanguage = () => {
    let nl = navigator.language;
    if (nl && nl.length) {
      let firstPart = nl.split('-')[0];
      if (Object.keys(AVAILABLE_LANGUAGES).indexOf(firstPart) > -1) {
        return firstPart
      }
    }
    return DEFAULT_LANGUAGE
};

export const getLanguage = () => {
    let lang = window.localStorage.getItem("language");
    if (lang && lang != 'undefined') {
        return lang
    }
    else {
        lang = detectBrowserLanguage();
        window.localStorage.setItem("language", lang);
        return lang
    }
};

export const setLanguage = (lang) => {
    window.localStorage.setItem("language", lang);
    return lang
};

export default { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, detectBrowserLanguage, getLanguage, setLanguage };

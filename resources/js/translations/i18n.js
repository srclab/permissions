import i18n from "i18next";
import {initReactI18next} from "react-i18next";

/**
 * Начальная конфигурация i18next
 */
i18n
    .use(initReactI18next)
    .init({
        resources:  {ru: {general: window.translations}},
        lng: document.getElementsByTagName('html')[0].getAttribute('lang'),
        fallbackLng: 'ru',
        debug: false
    });

export default i18n;
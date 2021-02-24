import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import korean from './lang/ko';
import english from './lang/en';

const resources = { 
    kr: korean,
    en: english
 };

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'kr',

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;

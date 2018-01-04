import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import {DIRECTORY_URL_PREFIX} from "../config/config";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',

        backend:{
            loadPath: DIRECTORY_URL_PREFIX + 'locales/{{lng}}/{{ns}}.json',
            // ajax : async (url, options, callback, data) => {
            //     const resp = await fetch(url);
            //     if (!resp || !resp.ok) return(false);// throw new Error(resp.status + ' ' + resp.statusText);
            //     const json = await resp.json();
            //     callback(json, resp);
            // },
        },

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: true
        }
    });


export default i18n;
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(LanguageDetector).use(initReactI18next).init({
    lng: 'en',
    debug: true,
    interpolation: {
    escapeValue: false,
    },
    resources: {
    en: {
        translation: {
            description: 'We are going to translate this to multiple languages',
            contacts: 'Contacts',
            searchContacts: "Search contacts",
            profile: 'Profile',
            name: 'Name',
            phone: 'Phone',
            email: 'Email',
            gender: 'Gender',
            action: 'Action',
            noContacts: 'No contacts found',
            contactDeleted: 'Contact deleted',
            errorOccurred: 'An error occurred',
            seeMenu: 'See menu',
            male: 'male',
            female: 'female',
            newContact: 'New contact',
            phoneNumber: 'Phone number',
            save: 'Save',
            cancel: 'Cancel',
            updateContact: 'Update contact',
            update: 'Update',
            clickToEmail: 'Click to email',
        }
    },
    fr: {
        translation: {
            description: 'Nous allons traduire ceci dans plusieurs langues',
            contacts: "Contacts",
            searchContacts: "Rechercher des contacts",
            profile: 'Profil',
            name: 'Nom',
            phone: 'Téléphone',
            email: 'Email',
            gender: 'Sexe',
            action: 'Action',
            noContacts: 'Aucun contact trouvé',
            contactDeleted: 'Contact supprimé',
            errorOccurred: 'Une erreur est survenue',
            seeMenu: 'Voir le menu',
            male: 'mâle',
            female: 'femelle',
            newContact: 'Nouveau contact',
            phoneNumber: 'Numéro de téléphone',
            save: 'Sauvegarder',
            cancel: 'Annuler',
            updateContact: 'Mettre à jour le contact',
            update: 'Mettre à jour',
            clickToEmail: 'Cliquez pour envoyer un email',
        }
    },
    },
});

// import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
// import { initReactI18next } from 'react-i18next';
//
// i18n
//     .use(Backend)
//     .use(initReactI18next)
//     .init({
//         lng: 'en',
//         fallbackLng: 'en',
//         debug: true,
//         interpolation: {
//             escapeValue: false,
//         },
//         backend: {
//             loadPath: '/locales/{{lng}}/{{ns}}.json',
//             ajax: async (url, options, callback, data) => {
//                 try {
//                     const res = await fetch(url);
//                     if (!res.ok) throw new Error('Failed to load translations');
//
//                     const translations = await res.json();
//                     callback(translations, { status: '200' });
//                 } catch (error) {
//                     // If the translation file is not found, translate the default language to the user's language
//                     const defaultLanguageTranslations = await fetch('/locales/en/translation.json');
//                     const defaultLanguageTexts = await defaultLanguageTranslations.json();
//
//                     const translatedTexts = {};
//
//                     for (const key in defaultLanguageTexts) {
//                         const text = defaultLanguageTexts[key];
//                         // Use the Google Cloud Translation API to translate the text
//                         const translatedText = await translateText(text, i18n.language);
//                         translatedTexts[key] = translatedText;
//                     }
//
//                     // Save the translated texts on your server
//                     await saveTranslations(i18n.language, translatedTexts);
//
//                     callback(translatedTexts, { status: '200' });
//                 }
//             },
//         },
//     });
//
// async function translateText(text, targetLanguage) {
//     // Call the Google Cloud Translation API to translate the text
//     // You need to implement this function
// }
//
// async function saveTranslations(language, translations) {
//     // Save the translations on your server
//     // You need to implement this function
// }
//
// import i18next from "i18next";
// import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";
//
// // const apiKey = "aEt0ShyAD6Hun7ag5zq35A";
// // const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;
//
// i18next
//     .use(HttpBackend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         fallbackLng: "en",
//
//         ns: ["default"],
//         defaultNS: "default",
//
//         supportedLngs: ["en","fr","es"],
//
//         backend: {
//             loadPath: "/locales/{{lng}}/{{ns}}.json"
//         }
//     })
// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';
//
// i18n.use(LanguageDetector).use(initReactI18next).init({
//     lng: 'en',
//     debug: true,
//     interpolation: {
//     escapeValue: false,
//     },
//     resources: {
//     en: {
//         translation: {
//             description: 'We are going to translate this to multiple languages',
//         }
//     },
//     fr: {
//         translation: {
//             description: 'Nous allons traduire ceci dans plusieurs langues',
//         }
//     },
//     },
// });

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
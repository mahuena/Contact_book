import React, { useEffect } from 'react';
import '../modules/googleButton.css';

const GoogleTranslate = () => {
    useEffect(() => {
        const addGoogleTranslateScript = () => {
            if (!document.querySelector('#google-translate-script')) {
                const script = document.createElement('script');
                script.id = 'google-translate-script';
                script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                script.async = true;
                document.body.appendChild(script);
            }
        };

        // Initialization function for Google Translate
        window.googleTranslateElementInit = () => {
            if (!document.querySelector('.goog-te-combo')) {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en', layout: window.google.translate.TranslateElement },
                    'google_translate_element'
                );
            }
        };
        // Add the Google Translate script
        addGoogleTranslateScript();
    }, []);

    return (
        <div id="google_translate_element"></div>
    );
};

export default GoogleTranslate;
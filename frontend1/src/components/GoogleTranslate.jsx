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
        window.googleTranslateElementInit = () => {
                window.google.translate.TranslateElement(

                    {
                        pageLanguage: 'en',
                        // layout: window.google.translate.TranslateElement,
                        includedLanguages: 'en,fr,es',
                    },
                    'google_translate_element',

                );
        };
        addGoogleTranslateScript();


    // const observer = new MutationObserver(() => {
    //     const banner = document.querySelector('.goog-te-banner-frame.skiptranslate');
    //     if (banner) {
    //         banner.style.display = 'none';
    //     }
    // });

        // observer.observe(document.body, { childList: true, subtree: true });
    // return () => observer.disconnect();
}, []);



return (
        <div id="google_translate_element"></div>
    );
};

export default GoogleTranslate;
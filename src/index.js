import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'
import App from './App';
import reportWebVitals from './reportWebVitals';

import AOS from 'aos';
import 'aos/dist/aos.css'

AOS.init({
  offset: 20,
  delay: 5,
  duration: 1500,
  easing: 'ease-out-back',
  once: false,
  mirror: false,
});


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'ar'],
    // fallbackLng: "en",
    detection: {
      order: ['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
    react: { useSuspense: false }
  });

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
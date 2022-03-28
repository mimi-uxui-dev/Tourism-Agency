/* eslint-disable */
import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import Services_comp from './services/Services_comp';
import TravelSlider from './TravelSlider';
import Quality from './Quality'
import ServicesComponent from './services2/ServicesComponent'
import ServiceUmrahCompo from './ServiceUmrah/ServiceUmrahCompo'
import Latest from './Latest/Latest';
import Partners from './Partners';
import Contact from './Contact'
import Testimony from './Testimony';
import Testimony2 from './Testimony2';

function Home() {
     const { t } = useTranslation()

     const languages = [
          {
               code: 'fr',
               name: 'Français',
               country_code: 'fr'
          },
          {
               code: 'en',
               name: 'English',
               country_code: 'gb'
          },
          {
               code: 'ar',
               name: 'العربية',
               dir: 'rtl',
               country_code: 'sa'
          },
     ]

     const currentLanguageCode = cookies.get('i18next') || 'en'
     const currentLanguage = languages.find(l => l.code === currentLanguageCode)

     useEffect(() => {
          document.body.dir = currentLanguage.dir || "ltr"
          document.title = t('app_title')
     }, [currentLanguage, t])

     return (
          <div>
               <TravelSlider />
               <ServicesComponent />
               <Services_comp />
               <Quality />
               <ServiceUmrahCompo />
               <Latest />
               <Testimony2 />
               <Partners />
          </div>
     )
}

export default Home

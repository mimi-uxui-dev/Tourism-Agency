import './App.scss';
import React, { useEffect } from 'react'

import { Route, Switch } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'

import { MyContextProvider } from './context/MyContext'
import { NavbarProvider } from './context/NavbarContext'
import Home from './components/Home'
import BlogsPage from './components/Blogs/BlogsPage'
import BlogDetails from './components/Blogs/BlogDetails'
import AboutUs from './components/AboutUs'
import FourZeroFour from './components/FourZeroFour'
import SearchPage from './components/SearchPage'
import ServicesPage from './components/services/ServicesPage'
import ServicesCategory from './components/services/ServicesCategory'
import OffersCategory from './components/services/OffersCategory'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar'
import ServicesDetails from './components/services/ServicesDetails'
import OffersDetails from './components/services/OffersDetails'
import Units from './components/Units/Units'
import ReservationCompo from './components/ReservationCompo'
import VisaCompo from './components/VisaCompo'
import NewsPage from './components/Blogs/NewsPage'
import NewsDetails from './components/Blogs/NewsDetails'

function App() {
  const { t } = useTranslation()

  const languages = [
    {
      code: 'fr',
      name: 'Français',
      country_code: 'fr',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      country_code: 'sa',
    },
  ]

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find(l => l.code === currentLanguageCode)

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr"
    document.title = t('app_title')
  }, [currentLanguage, t])


  return (
    <>
      <MyContextProvider>
        <NavbarProvider>
          <div id='App'>

            <Navbar languages={languages} />

            <Switch>

              <Route exact path="/" component={Home} />

              <Route exact path='/services/category/:id' > <ServicesCategory t={t} /> </Route>

              <Route exact path='/offers'><OffersCategory t={t} /> </Route>

              <Route exact path='/offers/:id' component={OffersDetails} />

              <Route exact path='/services/category/Hajj' > <ServicesCategory t={t} /> </Route>

              <Route path='/services/category/:id/service/:id_service' component={ServicesDetails} />

              <Route exact path='/services/reservation' component={ReservationCompo} />

              <Route exact path='/services/visa' component={VisaCompo} />

              <Route exact path="/units" component={Units} />

              <Route exact path="/news/:id" component={NewsDetails} />
              <Route exact path="/blogs/:id" component={BlogDetails} />

              <Route exact path="/news"  > <NewsPage t={t} /> </Route>
              <Route exact path="/blogs" > <BlogsPage t={t} /> </Route>



              <Route exact path="/about-us" component={AboutUs} />

              <Route exact path='/results' component={SearchPage} />

              <Route exact path="*" component={FourZeroFour} />

            </Switch>

            <ToastContainer />

            <Footer />
          </div>
        </NavbarProvider>
      </MyContextProvider>

    </>
  );
}

export default App
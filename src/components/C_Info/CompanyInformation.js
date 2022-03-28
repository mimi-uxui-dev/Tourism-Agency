import React, { useState, useEffect, useContext } from 'react'
import Slider from "react-slick"
import { MyContextProvider, MyContext } from '../context/MyContext'
import { useTranslation } from 'react-i18next'

import cookies from 'js-cookie'
import spinner from '../assets/img/spinner.svg'
import parse from 'html-react-parser'

import lineGreenish from '../assets/img/Vector 5.svg'
import quotes from '../assets/img/quotes.svg'
import menImg from '../assets/img/CompanyInfo/men01.jpg'

const CompanyInformation = ({ lang }) => {
       const { t } = useTranslation()

       const [companiesInfo, setCompaniesInfo] = useContext(MyContext)

       var slider_settings = {
              dots: false,
              autoplay: true,
              infinite: true,
              autoplaySpeed: 2500,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
       };

       var slider_settings2 = {
              dots: true,
              autoplay: true,
              infinite: true,
              autoplaySpeed: 2000,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
       };

       const textArabic = { textAlign: (cookies.get('i18next') === 'ar') ? "right" : "left" }

       return (
              <MyContextProvider>
                     <div className="ci_container">
                            <div className='MainTitle'>
                                   <p className='MainTitle0'>• {t('CI_TAG')} •</p>
                                   <h1 className='MainTitle1' > {t('CI_TITLE')} </h1>
                                   <img src={lineGreenish} alt="" />
                            </div>

                            <div className='ci_inner_containerA' >
                                   {/* <Slider {...slider_settings}>
                                          {
                                                 companiesInfo.length == 0 ?
                                                        <img src={spinner} className='spinner' alt="" />
                                                        : companiesInfo.photo.map(c => <img key={c.id} src={c.link} alt="" style={{ maxWidth: '700px', width: '100%' }} />)
                                          }
                                   </Slider> */}

                                   <img src="https://i.ibb.co/khD3M7L/woman01.jpg" alt="" style={{ maxWidth: '700px', width: '100%' }} />

                                   <div className='ci_txt_content' >
                                          <h1 className='headerTitle' style={textArabic} > {cookies.get('i18next') === 'ar' ? companiesInfo.name__ar : (cookies.get('i18next') == 'fr' ? companiesInfo.name__fr : companiesInfo.name__en)} </h1>
                                          <p className='category' >  {cookies.get('i18next') === 'ar' ? companiesInfo.category__ar : (cookies.get('i18next') == 'fr' ? companiesInfo.category__fr : companiesInfo.category__en)}  </p>
                                          <p className='paragraph'  >  {cookies.get('i18next') === 'ar' ? parse(`${companiesInfo.description__ar}`) : (cookies.get('i18next') == 'fr' ? parse(`${companiesInfo.description__fr}`) : parse(`${companiesInfo.description__en}`))} </p>

                                   </div>
                            </div>

                            <div className='testimonial_container'>
                                   <div className="testimonial">

                                          <img className='imgQuotes' src={quotes} alt="" />
                                          <div className="testimonialContainer" >
                                                 <p className='testimonialContainer_title'>Why customer love us</p>
                                                 <Slider {...slider_settings2}>
                                                        <div className='testimonialContainer_content'>
                                                               <p className='testimonialContainer_txt'>“I have been a regular customer in Freshio and the reason is I get a variety of organic products and it gives me many options to choose from and the Quality of the produce is good.Organic livestock raised for meat, eggs, and dairy products must have access to the outdoors and be given organic feed. They may not be given antibiotics.” </p>
                                                               <p className='testimonialContainer_name'> John Doe - <span> Bellandur Store</span></p>
                                                        </div>
                                                        <div className='testimonialContainer_content'>
                                                               <p className='testimonialContainer_txt'>“I have been a regular customer in Freshio and the reason is I get a variety of organic products and it gives me many options to choose from and the Quality of the produce is good.Organic livestock raised for meat, eggs, and dairy products must have access to the outdoors and be given organic feed. They may not be given antibiotics.” </p>
                                                               <p className='testimonialContainer_name'> John Doe - <span> Bellandur Store</span></p>
                                                        </div>
                                                        <div className='testimonialContainer_content'>
                                                               <p className='testimonialContainer_txt'>“I have been a regular customer in Freshio and the reason is I get a variety of organic products and it gives me many options to choose from and the Quality of the produce is good.Organic livestock raised for meat, eggs, and dairy products must have access to the outdoors and be given organic feed. They may not be given antibiotics.” </p>
                                                               <p className='testimonialContainer_name'> John Doe - <span> Bellandur Store</span></p>
                                                        </div>
                                                 </Slider>
                                          </div>
                                   </div>

                                   <img className='testimonial_containerIMG' src={menImg} alt="" />
                            </div>
                     </div>
              </MyContextProvider>
       )
}

export default CompanyInformation

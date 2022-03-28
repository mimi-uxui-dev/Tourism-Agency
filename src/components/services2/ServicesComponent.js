/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from "axios"
import { SERVICES_BEST } from '../../sevices/globalServices'
import { Link, useLocation } from "react-router-dom"
import Slider from 'react-slick'
import ServicesSliderCard from './ServicesSliderCard'
import left from '../../assets/img/Services/left.png'
import right from '../../assets/img/Services/right.png'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import noimg from '../../assets/img/noimg.png'

function ServicesComponent() {
     const { t } = useTranslation()

     const [services, setServices] = useState([])

     const fetchData = async () => await axios.get(SERVICES_BEST()).then(r => setServices(r.data.data))

     let slickRef = React.createRef()

     const { pathname } = useLocation();

     useEffect(() => {
          window.scrollTo(0, 0);
     }, [pathname]);


     useEffect(() => {
          fetchData()
     }, [])

     var settings = {
          centerMode: true,
          centerPadding: "180px",
          dots: false,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 2000,
          slidesToShow: services.length === 1 ? 1 : 2,
          slidesToScroll: 1,
          arrows: false,
          draggable: false,
          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1,
                         centerPadding: "30px",
                    }
               },
               {
                    breakpoint: 600,
                    settings: {
                         centerMode: false,
                         centerPadding: "30px",
                         slidesToShow: 1.1,
                         slidesToScroll: 1,
                    }
               },
               {
                    breakpoint: 480,
                    settings: {
                         centerMode: false,
                         centerPadding: "10px",
                         slidesToShow: 1.1,
                         slidesToScroll: 1,
                    }
               }
          ]
     };

     const n = () => slickRef.current.slickNext()
     const p = () => slickRef.current.slickPrev()
     //data-aos="fade-up"
     return (
          <div className='services_component__container'  >
               <div className='header'>
                    <div>
                         <h3>{t('OurBestTours')} </h3>
                         <h6>{t('OurBestTours_p')}</h6>
                    </div>
                    <div className='cta'>
                         <div className='thisSVG' onClick={p}>
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="40" y="40" width="40" height="40" rx="20" transform="rotate(-180 40 40)" fill="#A6A6A6" />
                                   <path d="M23 27.4999L15.5 19.9999L23 12.4999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                         </div>

                         <div className='thisSVG' onClick={n}>
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect width="40" height="40" rx="20" fill="#A6A6A6" />
                                   <path d="M17 12.5001L24.5 20.0001L17 27.5001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                         </div>
                    </div>
               </div>

               <div className="servicesSlider">
                    <Slider ref={slickRef}  {...settings}>
                         {
                              services.length === 0 ? <h3></h3> : services.map(p => <ServicesSliderCard key={p} data={p} />)
                         }
                    </Slider>
               </div>


          </div>
     )
}

export default ServicesComponent

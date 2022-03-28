/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { SERVICES_CAT_HAJJ } from '../../sevices/globalServices'
import 'swiper/swiper.scss';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

import noimg from '../../assets/img/noimg.png'
import parser from 'html-react-parser'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

function ServiceUmrahCompo() {
     const { t } = useTranslation()
     const [serviceHajj, setServiceHajj] = useState([])

     const fetchData = async () => {
          const data = await axios.get(SERVICES_CAT_HAJJ())
          setServiceHajj(data.data.data[0].services)
     }

     useEffect(() => {
          fetchData()
     }, [])

     const navigationPrevRef = useRef(null)
     const navigationNextRef = useRef(null)

     // data-aos="fade-up"
     // console.log('Awwwww ->', serviceHajj)
     return (
          <div className='offer_umrah__container' data-aos="fade-up"   >
               <div className='header'>
                    <div>
                         <h3> {t('UmrahSeason2022')}  </h3>
                         <h6>{t('UmrahSeason2022_p')}  </h6>
                    </div>
                    <div className='cta'>
                         <Link to={{
                              pathname: "/services/category/Hajj",
                              state: { data: serviceHajj.services }
                         }}
                         >  {t('ViewUmrahDeals')} </Link>

                         <div>
                              <div className='thisSVG' ref={navigationPrevRef}>
                                   <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="40" y="40" width="40" height="40" rx="20" transform="rotate(-180 40 40)" fill="#A6A6A6" />
                                        <path d="M23 27.4999L15.5 19.9999L23 12.4999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                              </div>
                              <div className='thisSVG' ref={navigationNextRef}>
                                   <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="20" fill="#A6A6A6" />
                                        <path d="M17 12.5001L24.5 20.0001L17 27.5001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                   </svg>
                              </div>
                         </div>
                    </div>
               </div>


               <div className="swiperHajj" style={{ direction: "ltr" }}>

                    <Swiper
                         navigation={{
                              prevEl: navigationPrevRef.current,
                              nextEl: navigationNextRef.current,
                         }}
                         spaceBetween={1}
                         slidesPerView={1}
                         parallax={true}
                         allowTouchMove={false}
                         loop={true}
                         autoplay={{
                              "delay": 2300,
                              "autoplayDisableOnInteraction": true
                         }}
                    >
                         {
                              serviceHajj.map(i => <SwiperSlide className='hajjSlide' key={i.id} >
                                   {
                                        i.services_media === undefined ?
                                             <img className='sliderImg' src={noimg} alt="" />
                                             :
                                             (
                                                  i.services_media.map(img => ((img.type__en === "Photo") ? <img className='sliderImg' src={img.link_original} alt="" /> : "")))
                                   }

                                   <div className="text">
                                        <h2>{cookies.get('i18next') === 'ar' ? i.name__ar : (cookies.get('i18next') === 'fr' ? i.name__fr : i.name__en)}  </h2>

                                        <button> <Link to={{ pathname: `/services/category/${i.service_categories_id}/service/${i.id}`, state: { data: i } }}> {t('ExploreDetails')} </Link> </button>
                                   </div>

                              </SwiperSlide>




                              )
                         }
                    </Swiper>

               </div>



          </div>
     )
}

export default ServiceUmrahCompo
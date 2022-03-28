import React, { useState, useEffect, useRef } from 'react'

/* eslint-disable */
import axios from 'axios';
import { FEEDBACK } from '../sevices/globalServices'
import left from '../assets/img/Services/left.png'
import right from '../assets/img/Services/right.png'
import i2 from '../assets/img/Testimony/Icon.svg'
import img from '../assets/img/Testimony/img.svg'
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import SwiperCore, { Pagination, Navigation, Autoplay, Parallax } from 'swiper/core';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

function Testimony2() {
     const { t } = useTranslation()
     SwiperCore.use([Navigation, Pagination, Autoplay])

     const navigationPrevRef = useRef(null)
     const navigationNextRef = useRef(null)
     const [feedbackC, setFeedback] = useState([])

     const fetchData = async () => {
          const data = await axios.get(FEEDBACK())
          setFeedback(data.data.data)
     }

     useEffect(() => {
          fetchData()
     }, [])

     // data-aos="fade-up"
     return (
          <div className='feedback__container'   >

               {/* //data-aos="fade-right"  */}
               <div className='header' >
                    <h3>{t('WPRS')} </h3>

                    <div className='header__'>
                         <h6>{t('WPRS_p')} </h6>

                         <div className='cta'>

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

               <Swiper
                    style={{ direction: "ltr" }}
                    // data-aos="fade-left"
                    className='swiperContainer'
                    navigation={{
                         prevEl: navigationPrevRef.current,
                         nextEl: navigationNextRef.current,
                    }}
                    pagination={{ clickable: true }}
                    slidesPerView={feedbackC.length < 3 ? feedbackC.length : 3}
                    loop={true}
                    autoplay={{
                         "delay": 1700,
                         "disableOnInteraction": false
                    }}
                    breakpoints={{
                         "1600": {
                              "slidesPerView": 2.5,
                              "spaceBetween": 20
                         },
                         "1440": {
                              "slidesPerView": 2.5,
                              "spaceBetween": 20
                         },
                         "1026": {
                              "slidesPerView": 2,
                              "spaceBetween": 20
                         },
                         "600": {
                              "slidesPerView": 1,
                              "spaceBetween": 1

                         },
                         "480": {
                              "slidesPerView": 1,
                              "spaceBetween": 1

                         },
                         "380": {
                              "slidesPerView": 1,
                              "spaceBetween": 0

                         }
                    }}
               >
                    {feedbackC.map((f) => <SwiperSlide>
                         <div className='swipr_div' >
                              <div>
                                   <img className='swipr_div_flag' src={i2} alt="" />
                                   <p className='swipr_div_body' >
                                        {f.body}
                                   </p>
                              </div>
                              <div className='swipr_div_text'>
                                   <img src={f.photo} alt="" />
                                   <div>
                                        <p className='swipr_div_creacte'> {f.created_by} </p>
                                        <p className='swipr_div_role'> {f.role} </p>
                                   </div>
                              </div>
                         </div>
                    </SwiperSlide>)}
               </Swiper>

          </div >
     )
}

export default Testimony2

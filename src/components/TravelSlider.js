/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { SLIDERS, addDataIntoCache } from '../sevices/globalServices'
import { TweenMax } from "gsap/all";
import SearchBar from './Search/SearchBar'
import cookies from 'js-cookie'

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination, Navigation, Autoplay, Parallax } from 'swiper/core';
import InnerTripleSlider from './InnerTripleSlider';
SwiperCore.use([Pagination, Navigation, Autoplay, Parallax]);

function TravelSlider() {

     const [sliders, setSliders] = useState([])


     const fetchData = async () => {
          await axios.get(SLIDERS()).then(data => {
               setSliders(data.data.data)
               // localStorage.setItem('sliders', JSON.stringify(sliders))
          })
     }

     useEffect(() => {
          fetchData()
     }, [])



     const navigationPrevRef = useRef(null)
     const navigationNextRef = useRef(null)

     return (
          <div className="TA_slider" >
               <div className="backgroundSlider" style={{ direction: "ltr" }}>
                    <Swiper

                         autoplay={{
                              "delay": 5000,
                              "autoplayDisableOnInteraction": false
                         }}

                         parallax={true}

                         navigation={{
                              prevEl: navigationPrevRef.current,
                              nextEl: navigationNextRef.current,
                         }}

                         className='swiperSlider01'

                         slidesPerView={1}

                         spaceBetween={0.1}
                         loop={true}
                         allowTouchMove={false}

                         onSlideChangeTransitionStart={
                              () => {
                                   let imgg = document.getElementsByClassName('slideBgImg')
                                   TweenMax.to(imgg, 0.5, { opacity: 1, delay: 0.15, ease: Strong.easeInOut });


                              }
                         }

                         onSlideChangeTransitionEnd={
                              () => {
                                   let imgg = document.getElementsByClassName('slideBgImg')
                                   TweenMax.from(imgg, 0.5, { opacity: 1, delay: 0.15, ease: Strong.easeInOut });
                              }
                         }

                    >
                         {
                              sliders.map(slide => <SwiperSlide key={slide.id} >
                                   <img className='slideBgImg' src={slide.photo} alt='' />
                              </SwiperSlide>)
                         }
                    </Swiper>
               </div>


               <InnerTripleSlider navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} data={sliders} />


               <Swiper
                    style={{ direction: "ltr" }}

                    autoplay={{
                         "delay": 5000,
                         "autoplayDisableOnInteraction": false
                    }}

                    navigation={{
                         prevEl: navigationPrevRef.current,
                         nextEl: navigationNextRef.current,
                    }}

                    className='swiperSlider03'
                    slidesPerView={1}

                    allowTouchMove={false}
                    loop={true}

                    onSlideChangeTransitionStart={
                         () => {
                              let intro = document.getElementsByClassName('swiperP0')
                              let title = document.getElementsByClassName('swiperH1')
                              let content = document.getElementsByClassName('swiperP')
                              TweenMax.to(intro, 0.5, { opacity: 1, y: -60, delay: 0.15, ease: Strong.easeInOut });
                              TweenMax.to(title, 0.5, { opacity: 1, y: -60, delay: 0.15, ease: Strong.easeInOut });
                              TweenMax.to(content, 0.5, { opacity: 1, y: -60, delay: 0.15, ease: Strong.easeInOut });
                         }
                    }

                    onSlideChangeTransitionEnd={
                         () => {
                              let intro = document.getElementsByClassName('swiperP0')
                              let title = document.getElementsByClassName('swiperH1')
                              let content = document.getElementsByClassName('swiperP')
                              TweenMax.from(intro, 0.5, { opacity: 0, y: 60, delay: 0.15, ease: Strong.easeInOut });
                              TweenMax.from(title, 0.2, { opacity: 0, y: 60, delay: 0.15, ease: Strong.easeInOut });
                              TweenMax.from(content, 0.5, { opacity: 0, y: 60, delay: 0.15, ease: Strong.easeInOut });
                         }
                    }
               >
                    {
                         sliders.map(slide => <SwiperSlide key={slide.id}>
                              <div className='swiperSlideInfo'>
                                   <p className='swiperP0'> {cookies.get('i18next') === 'ar' ? slide.intro__ar : (cookies.get('i18next') === 'fr' ? slide.intro__fr : slide.intro__en)} </p>
                                   <h1 className='swiperH1'> {cookies.get('i18next') === 'ar' ? slide.title__ar : (cookies.get('i18next') === 'fr' ? slide.title__fr : slide.title__en)} </h1>
                                   <p className='swiperP'> {cookies.get('i18next') === 'ar' ? slide.content__ar : (cookies.get('i18next') === 'fr' ? slide.content__fr : slide.content__en)} </p>
                              </div>
                         </SwiperSlide>)
                    }
               </Swiper>

               <SearchBar />
          </div >
     )
}

export default TravelSlider
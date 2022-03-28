import React from 'react'
import { TweenMax } from "gsap/all";
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination, Navigation, Autoplay, Parallax } from 'swiper/core';
SwiperCore.use([Pagination, Navigation, Autoplay, Parallax]);


function InnerTripleSlider({ navigationPrevRef, navigationNextRef, data }) {


     return (
          <div className='swiperSlider02Container' style={{ direction: "ltr" }}>
               <Swiper
                    autoplay={{
                         "delay": 5000,
                         "disableOnInteraction": false
                    }}
                    slidesPerView={3}
                    spaceBetween={24}
                    navigation={{
                         prevEl: navigationPrevRef.current,
                         nextEl: navigationNextRef.current,
                    }}
                    allowTouchMove={false}
                    loop={true}
                    className='swiperSlider02'
                    onSlideChangeTransitionStart={
                         () => {
                              /* const tl = new TimelineMax()
                              let img2 = document.getElementsByClassName('swiper-slide-duplicate-active')
                              let cover = document.getElementsByClassName('cover')

                              tl.from(cover, 1, { scaleX: 0, transformOrigin: "left" });
                              tl.to(cover, 1, { scaleX: 0, transformOrigin: "right" }, "reveal");
                              tl.from(img2, 1, { opacity: 0 }, "reveal"); */
                         }
                    }

                    onSlideChangeTransitionEnd={
                         () => {

                         }
                    }
               >
                    {data.map(slide => <SwiperSlide key={slide.id}> <img className='slider2ndImg' src={slide.second_photo} alt='' /> <div className="cover"></div> </SwiperSlide>)}

               </Swiper>

               <div className='swipeNavigationn'>
                    <div className='thisSVG' ref={navigationPrevRef}  >
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

     )
}

export default InnerTripleSlider

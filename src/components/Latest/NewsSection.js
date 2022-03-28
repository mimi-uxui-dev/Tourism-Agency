import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NEWS_LIMIT } from '../../sevices/globalServices'
import LatestCardNews from './LatestCardNews';

import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

function NewsSection() {
     SwiperCore.use([Navigation, Pagination])

     const [news, setNews] = useState([])

     const fetchNews = async () => {
          const res = await axios.get(NEWS_LIMIT(3))
          setNews(res.data.data)
     }

     useEffect(() => {
          fetchNews()
     }, [])

     return (
          <>
               <div className='blogsC__section' id='services2_grid'>
                    {
                         news.length > 0 ? news.map(n => <LatestCardNews key={n.id} data={n} />) : <h6></h6>
                    }
               </div>
               <div className='blogsC__section' >
                    <Swiper
                         id="services2_grid_swiper"
                         autoPlay={true}
                         data-aos="fade-left"
                         pagination={{ clickable: true }}
                         spaceBetween={20}
                         slidesPerView={2.2}
                         loop={true}
                         breakpoints={{
                              "1024": {
                                   "slidesPerView": 2.2,
                                   "spaceBetween": 20
                              },
                              "600": {
                                   "slidesPerView": 2.2,
                                   "spaceBetween": 20
                              },
                              "480": {
                                   "slidesPerView": 1.1,
                                   "spaceBetween": 20
                              }
                         }}
                    >
                         {
                              news.length > 0 ? news.map(n => <SwiperSlide>
                                   <LatestCardNews key={n.id} data={n} />
                              </SwiperSlide>) : ""
                         }

                    </Swiper>
               </div>
          </>
     )
}

export default NewsSection

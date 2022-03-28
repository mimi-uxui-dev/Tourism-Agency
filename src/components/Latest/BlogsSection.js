import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BLOG_LIMIT } from '../../sevices/globalServices'
import LatestCardBlog from './LatestCardBlog';

import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

function BlogsSection() {
     SwiperCore.use([Navigation, Pagination])


     const [blogs, setBlogs] = useState([])

     const fetchBlogs = async () => {
          const res = await axios.get(BLOG_LIMIT(3))
          setBlogs(res.data.data)
     }

     useEffect(() => {
          fetchBlogs()
     }, [])

     return (
          <>
               <div className='blogsC__section' id='services2_grid'>
                    {
                         blogs.length > 0 ? blogs.map(blog => <LatestCardBlog key={blog.id} data={blog} />) : ""
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

                              blogs.length > 0 ? blogs.map(blog => <SwiperSlide key={blog.id}>
                                   <LatestCardBlog data={blog} />
                              </SwiperSlide>) : ""
                         }

                    </Swiper>
               </div>
          </>
     )
}

export default BlogsSection
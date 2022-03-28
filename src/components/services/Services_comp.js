/* eslint-disable */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVICE_C } from '../../sevices/globalServices'
import { Link } from "react-router-dom"
import ServicesCategoryCard from './ServicesCategoryCard'
import i from '../../assets/img/Services/servicesCategory/5.png'
import i1 from '../../assets/img/Services/servicesCategory/4.png'
import { useTranslation } from 'react-i18next'

import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

function Services_comp() {
     SwiperCore.use([Navigation, Pagination])
     const { t } = useTranslation()

     const [servicesC, setServicesC] = useState([])

     const fetchData = async () => {
          const data = await axios.get(SERVICE_C())
          setServicesC(data.data.data)
     }

     useEffect(() => {
          fetchData()
     }, [])
     // data-aos="fade-up" 
     return (

          <div className='services2_component__container' >

               <div className='header'>
                    <div>
                         <h3>{t('Our_Services_Conclude')}</h3>
                         <h6>{t('Our_Services_Conclude_p')} </h6>
                    </div>
               </div>

               <div id='services2_grid' className="services2_grid">
                    {
                         servicesC.map(sc => <Link to={`/services/category/${sc.id}`} key={sc.id} >
                              <ServicesCategoryCard data={sc} />
                         </Link>)
                    }

                    <Link to='services/reservation'>
                         <div className="services_c_card__container" >
                              <div className="img_container">
                                   <img className='first' src={i} alt="" />
                                   <img className='second' src={i} alt="" />
                              </div>
                              <div>
                                   <p className="title"> {t('Reservation_H')} </p>
                              </div>
                         </div>
                    </Link>

                    <Link to='services/visa'>
                         <div className="services_c_card__container" >
                              <div className="img_container">
                                   <img className='first' src={i1} alt="" />
                                   <img className='second' src={i1} alt="" />
                              </div>
                              <div>
                                   <p className="title"> {t('Study_Visa_Files')} </p>
                              </div>
                         </div>
                    </Link>

               </div>

               <br />

               <Swiper
                    id="services2_grid_swiper"
                    autoplay={true}
                    data-aos="fade-left"
                    className='swiperContainer'
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
                              "slidesPerView": 1.2,
                              "spaceBetween": 20
                         },
                         "480": {
                              "slidesPerView": 1.2,
                              "spaceBetween": 5
                         }
                    }}
               >

                    {
                         servicesC.map(sc => <Link to={`/services/category/${sc.id}`} key={sc.id} >
                              <SwiperSlide> <ServicesCategoryCard data={sc} /></SwiperSlide>
                         </Link>)
                    }

                    <SwiperSlide>
                         <Link to='services/reservation'>
                              <div className="services_c_card__container" >
                                   <div className="img_container">
                                        <img className='first' src={i} alt="" />
                                        <img className='second' src={i} alt="" />
                                   </div>
                                   <div>
                                        <p className="title"> {t('Reservation_H')} </p>
                                   </div>
                              </div>
                         </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                         <Link to='services/visa'>
                              <div className="services_c_card__container" >
                                   <div className="img_container">
                                        <img className='first' src={i1} alt="" />
                                        <img className='second' src={i1} alt="" />
                                   </div>
                                   <div>
                                        <p className="title"> {t('Study_Visa_Files')} </p>
                                   </div>
                              </div>
                         </Link>
                    </SwiperSlide>



               </Swiper>


          </div>
     )
}

export default Services_comp
import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { SERVICE, COMPANY_INFORMATION } from '../../sevices/globalServices'
import { useParams } from 'react-router-dom'
import flag from '../../assets/img/Services/details/flag.svg'
import noimg from '../../assets/img/noimg.png'
import calendar from '../../assets/img/Services/details/CalendarBlank.svg'
import clock from '../../assets/img/Services/details/Clock.svg'
import mapPin from '../../assets/img/Services/details/MapPin.svg'
import translate from '../../assets/img/Services/details/Translate.svg'
import users from '../../assets/img/Services/details/Users.svg'
import moment from 'moment'
import parse from 'html-react-parser'
import MapComponent2 from '../MapComponent2'
import left from '../../assets/img/Services/left.png'
import right from '../../assets/img/Services/right.png'
import Slider from 'react-slick'
import ServicesComponent from '../services2/ServicesComponent'
import Services_comp from './Services_comp'
import { Anchor, Timeline, Affix } from 'antd';
import paperP from '../../assets/img/Services/details/paper-plane.svg'
import parser from "html-react-parser"
import SimpleReactLightbox, { useLightbox, SRLWrapper } from 'simple-react-lightbox'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { NavbarContext } from "../../context/NavbarContext";

const { Link } = Anchor;

function ServicesDetails() {
     const { t } = useTranslation()
     const { id_service } = useParams()
     const [service, setService] = useState([])
     const [ci, setCi] = useState([])

     const { toggleFunction } = useContext(NavbarContext)

     const fetchCI = async () => await axios.get(COMPANY_INFORMATION(1)).then(data => setCi(data.data.data))
     const ref = useRef(100)

     useEffect(() => {
          fetchCI()
     }, [])

     useEffect(() => {
          const fetchData = async () => await axios.get(SERVICE(id_service)).then(data => setService(data.data.data))
          fetchData()
     }, [id_service])

     let slickRef = React.createRef()

     var settings = {

          dots: false,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 1700,
          slidesToShow: service.hasOwnProperty('services_media') && service.services_media.length < 4 ? service.services_media.length : 4,
          slidesToScroll: 1,
          arrows: false,

          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: 3,
                         slidesToScroll: 1
                    }
               },
               {
                    breakpoint: 600,
                    settings: {
                         slidesToShow: 2,
                         slidesToScroll: 1
                    }
               },
               {
                    breakpoint: 480,
                    settings: {
                         slidesToShow: 2.1,
                         slidesToScroll: 1
                    }
               }
          ]
     };

     function getContainer() {
          return document.querySelector(".serviceD__content");
     }

     const [mode, setMode] = useState('left');
     const n = () => slickRef.current.slickNext()
     const p = () => slickRef.current.slickPrev()

     console.log('serr', service)

     return (
          service.length === 0 ? <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} > <h1> Loading.. </h1> </div> :
               <div className='servicesD__container' id="servicesD__container"  >

                    <div id='scrollLayout'>

                         <div className="img_container1" >

                              {
                                   service.services_media.length === 0 ? <>
                                        <img className='first' src={noimg} alt="" />
                                        {/*  <img className='second' src={noimg} alt="" /> */}
                                   </> : <>
                                        <img className='first' src={service.services_media[0].link_original} alt="" />
                                        {/* <img className='second' src={service.services_media[0].link} alt="" /> */}
                                   </>
                              }

                              <div className='innerText' >
                                   <div className='a' >
                                        <img src={flag} alt="" />
                                        <p className='voy' >{cookies.get('i18next') === 'ar' ? service.type__ar : (cookies.get('i18next') === 'fr' ? service.type__fr : service.type__en)} </p>
                                        <p className='loca'>{cookies.get('i18next') === 'ar' ? service.location_address__ar : (cookies.get('i18next') === 'fr' ? service.location_address__fr : service.location_address__en)} </p>
                                   </div>

                                   <p className='text01'>{cookies.get('i18next') === 'ar' ? service.name__ar : (cookies.get('i18next') === 'fr' ? service.name__fr : service.name__en)} </p>

                                   <div className='b' >

                                        <div className='b_' >
                                             <img src={clock} alt="" />
                                             <div>
                                                  <p className='title'>{t('Duration')}</p>
                                                  <p className='para'>{cookies.get('i18next') === 'ar' ? service.duration__ar : (cookies.get('i18next') === 'fr' ? service.duration__fr : service.duration__en)} </p>
                                             </div>
                                        </div>

                                        <div className="line_"></div>

                                        <div className='b_'>
                                             <img src={users} alt="" />
                                             <div>
                                                  <p className='title'>{t('GroupSize')} </p>
                                                  <p className='para'> {service.groupe_size} </p>
                                             </div>
                                        </div>

                                        <div className="line_"></div>

                                        <div className='b_'>
                                             <img src={calendar} alt="" />
                                             <div>
                                                  <p className='title'>{t('TourDate')} </p>
                                                  <p className='para'> {moment(service.date_at).format('DD/MM/YYYY')} - {moment(service.date_to).format('DD/MM/YYYY')}  </p>
                                             </div>
                                        </div>

                                        <div className="line_"></div>


                                        <div className='b_'>
                                             <img src={translate} alt="" />
                                             <div>
                                                  <p className='title'> {t('Language')} </p>
                                                  <p className='para'>{cookies.get('i18next') === 'ar' ? service.language__ar : (cookies.get('i18next') === 'fr' ? service.language__fr : service.language__en)}  </p>
                                             </div>
                                        </div>

                                   </div>
                              </div>
                         </div>

                         <div className="serviceD__content"  >

                              <div className='content' ref={ref} id="my-scroll-layout" >
                                   {
                                        service.overview__en ?
                                             <div className='ov' id='Overview' >
                                                  <p> {cookies.get('i18next') === 'ar' ? parser(`${service.overview__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${service.overview__fr}`) : parser(`${service.overview__en}`))}  </p>
                                             </div>
                                             :
                                             null
                                   }

                                   {
                                        service.services_media.length === 0 ? null : <div className='toursPhoto' id='Photos'>
                                             <div className='header'>
                                                  <h3> {t('photosTour')} </h3>
                                                  <div className='cta'>
                                                       <div className='thisSVG' onClick={p}>
                                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <rect x="40" y="40" width="40" height="40" rx="20" transform="rotate(-180 40 40)" fill="#A6A6A6" />
                                                                 <path d="M23 27.4999L15.5 19.9999L23 12.4999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                       </div>

                                                       <div className='thisSVG' onClick={n}>
                                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                 <rect width="40" height="40" rx="20" fill="#A6A6A6" />
                                                                 <path d="M17 12.5001L24.5 20.0001L17 27.5001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className="serviceD_slider">
                                                  <SimpleReactLightbox>

                                                       <SRLWrapper>
                                                            <Slider ref={slickRef} {...settings}>
                                                                 {
                                                                      service.services_media.length === 0 ? <h3>No Data</h3> : service.services_media.map(p => <div className='serviceD_slide' >
                                                                           <img src={p.link} data-attribute="SRL" alt="" />
                                                                      </div>)
                                                                 }
                                                            </Slider>
                                                       </SRLWrapper>
                                                  </SimpleReactLightbox>
                                             </div>
                                        </div>
                                   }

                                   {
                                        service.included__en ?
                                             <div className='ia' id='Include'>
                                                  <h3>{t('IncludeActivity')} </h3>
                                                  <div>
                                                       {cookies.get('i18next') === 'ar' ? parser(`${service.included__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${service.included__fr}`) : parser(`${service.included__en}`))}
                                                  </div>
                                             </div>
                                             : null
                                   }

                                   {
                                        service.services_planing.length === 0 ?
                                             null
                                             :
                                             <div className='progrm' id='Program' >
                                                  <h3>{t('DailyProgram')} </h3>
                                                  <Timeline mode={mode}>
                                                       {service.services_planing.length === 0 ? '' : service.services_planing.map(s => <Timeline.Item label={moment(s.date_at).format('DD-MMMM-YYYY')} >  {cookies.get('i18next') === 'ar' ? parser(`${s.programme__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${s.programme__fr}`) : parser(`${s.programme__en}`))}    </Timeline.Item>)}
                                                  </Timeline>
                                             </div>
                                   }


                                   <div className='lo' id='Location'  >
                                        <h3> {t('TourLocation')} </h3>
                                        <div className='lo_'> <img src={mapPin} alt="" /> <p> {cookies.get('i18next') === 'ar' ? parser(`${ci.address__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${ci.address__fr}`) : parser(`${ci.address__en}`))} </p>  </div>
                                        <div className="ci_map">
                                             <MapComponent2 lat={service.latitude} long={service.longitude} />
                                        </div>
                                   </div>

                              </div>

                              <div className='anchor1'>
                                   {
                                        <Anchor getContainer={getContainer}>
                                             <div className='anchor_container'>
                                                  {service.overview__en ? <Link href="#Overview" title={t('Overview')} /> : null}
                                                  {service.services_media.length === 0 ? null : <Link href="#Photos" title={t('TourPhotos')} />}
                                                  {service.included__en ? <Link href="#Include" title={t('IncludeActivity')} /> : null}
                                                  {service.services_planing.length === 0 ? null : <Link href="#Program" title={t('DailyProgram')} />}
                                                  <Link href="#Location" title={t('TourLocation')} />
                                             </div>
                                             <div className="price_container">
                                                  <div className='anchorPrice'>
                                                       <div className='text'>
                                                            <p> {t('start')}</p>
                                                            <p> <strong> {service.price} </strong> <span> {t('DZA')} </span> </p>
                                                       </div>
                                                       <hr style={{ background: 'red' }} />
                                                       <div className='priceBtn' onClick={toggleFunction} >
                                                            {t('Contactustobook')}  &nbsp; | &nbsp; <img src={paperP} alt="" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </Anchor>
                                   }
                              </div>
                         </div>
                    </div>

                    <ServicesComponent />

                    <Services_comp />
               </div>
     )
}

export default ServicesDetails

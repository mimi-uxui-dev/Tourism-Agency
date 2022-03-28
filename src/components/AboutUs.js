import React, { useEffect, useState } from 'react'
import logo from '../assets/img/Aboutus/logo.svg'
import fcb from '../assets/img/Aboutus/Section/fcb.svg'
import ig from '../assets/img/Aboutus/Section/ig.svg'
import tw from '../assets/img/Aboutus/Section/tw.svg'
import yt from '../assets/img/Aboutus/Section/yt.svg'
import email from '../assets/img/Aboutus/email.svg'
import phone from '../assets/img/Aboutus/phone.svg'
import fax from '../assets/img/Aboutus/fax.svg'
import Teams from './Teams/Teams'
import FaqsCompo from './Faqs/FaqsCompo'
import Headquarter from './Headquarter'
import axios from "axios"
import { COMPANY_INFORMATION } from '../sevices/globalServices'
import parser from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"

import Statistics from './Statistics'
import CoverPlaceholder from './Placeholders/CoverPlaceholder';

function AboutUs() {
     const { t } = useTranslation()

     const [companiesInfo, setCompaniesInfo] = useState([])
     const [loading, setLoading] = useState(false)
     const [ready, setReady] = useState(false)

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const res = await axios.get(COMPANY_INFORMATION(1))
                    setCompaniesInfo(res.data.data)
                    setLoading(false)
                    //  console.log("aa", companiesInfo)
               } catch (e) {
                    // console.log(e)
                    setCompaniesInfo([])
                    setLoading(false)
               }
          }
          fetchData()
          setReady(true)
     }, [])

     return (
          <>
               <div className='aboutus_header'></div>


               <div className="aboutus__container" >

                    <div className="header">
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <img src={logo} alt="Anour el sabah" />
                         </ReactPlaceholder>
                         <h1> {t('AnourElSabah')} </h1>
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <p>{cookies.get('i18next') === 'ar' ? companiesInfo.slogan__ar : (cookies.get('i18next') === 'fr' ? companiesInfo.slogan__fr : companiesInfo.slogan__en)} </p>
                         </ReactPlaceholder>
                    </div>

                    <div className='contact'>
                         <div> <img src={phone} alt="Anouar el sabah" /> <strong> {t('Telephone')}  </strong> <span>  035 84 57 86  </span> </div> <span className="slash">/</span>
                         <div> <img src={email} alt="Anouar el sabah" /> <strong> {t('mail')} </strong> <span> Anouarelsabah@gmail.com </span> </div> <span className="slash">/</span>
                         <div> <img src={fax} alt="Anouar el sabah" /> <strong> {t('Fax')}  </strong> <span> 035 84 57 86 </span> </div>
                    </div>

                    <div className="sm">
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <a href={companiesInfo.facebook} target='_blank'> <img src={fcb} alt="" /> </a>
                         </ReactPlaceholder>
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <a href={companiesInfo.instagram} target='_blank'> <img src={ig} alt="" /> </a>
                         </ReactPlaceholder>
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <a href={companiesInfo.youtube} target='_blank'> <img src={yt} alt="" /> </a>
                         </ReactPlaceholder>
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <a href={companiesInfo.twitter} target='_blank'> <img src={tw} alt="" /> </a>
                         </ReactPlaceholder>
                    </div>

                    <div className='ci_photo'>
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <div className="img_container">
                                   <img className='first' src={`${companiesInfo.photo === undefined ? '' : companiesInfo.photo.find(p => p.type === "Company Images").link}`} alt="Anour el sabah" />
                                   <img className='second' src={`${companiesInfo.photo === undefined ? '' : companiesInfo.photo.find(p => p.type === "Company Images").link}`} alt="Anour el sabah" />
                              </div>
                         </ReactPlaceholder>
                    </div>

                    <Statistics />

                    <div className="mainDesc">
                         {/* <h2>{t('Heading')} </h2> */}
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={5} color='#CFCFCF'>
                              <div>
                                   {
                                        !loading ?
                                             companiesInfo.hasOwnProperty("description__en") ?
                                                  cookies.get('i18next') === 'ar' ?
                                                       parser(`${companiesInfo.description__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${companiesInfo.description__fr}`) : parser(`${companiesInfo.description__en}`))
                                                  :
                                                  <span></span>
                                             :
                                             <span></span>
                                   }
                              </div>
                         </ReactPlaceholder>
                    </div>
               </div>

               <div className="team__container">
                    <Teams />
               </div>

               <div className="faqs__container">
                    <FaqsCompo />
               </div>

               <div className="headquarter__container">
                    <Headquarter t={t} />
               </div>

          </>

     )
}

export default AboutUs

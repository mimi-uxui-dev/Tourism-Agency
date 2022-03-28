import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { COMPANY_INFORMATION } from '../../sevices/globalServices'

import logo from '../../assets/img/travelAgency/Logo.svg'

import fb from '../../assets/img/travelAgency/fb.svg'
import ig from '../../assets/img/travelAgency/ig.svg'
import tw from '../../assets/img/travelAgency/tw.svg'
import yt from '../../assets/img/travelAgency/yt.svg'

import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'


function FooterSocialLink() {
     const { t } = useTranslation()

     const [ci, setCi] = useState([])
     const [loading, setLoading] = useState(false)

     const fetchData = async () => {
          const r = await axios.get(COMPANY_INFORMATION(1))
          setCi(r.data.data)
          setLoading(false)
     }

     useEffect(() => {
          fetchData()
     }, [])

     // console.log('ci', ci)

     return (
          <div className='footerSM__container'>

               <div className='contact'>
                    <h3> {t('YouCanReachOurTeamAt')} </h3>

                    <div className="contact_rows">

                         <div className='contact_row' >
                              <div>
                                   <p className="tiitle">{t('tourismServices')} </p>
                                   <div>
                                        {
                                             !loading ?
                                                  (ci.length !== 0 && ci.hasOwnProperty('phone')) ?
                                                       Object.keys(ci.phone.tourism_phone).map((key, index) => <p> {ci.phone.tourism_phone[key]} </p>) : <div>
                                                            <p>+213 333 333  33</p>
                                                       </div>
                                                  :
                                                  <div>
                                                       <p>+213 333 333  33</p>
                                                  </div>
                                        }
                                   </div>
                              </div>

                              <div>
                                   <p className="tiitle">{t('UmrahServices')}</p>
                                   <div>
                                        {
                                             !loading ?
                                                  (ci.length !== 0 && ci.hasOwnProperty('phone')) ?
                                                       Object.keys(ci.phone.omra_phone).map((key, index) => <p> {ci.phone.omra_phone[key]} </p>) : <div>
                                                            <p>+213 333 333  33</p>
                                                       </div>
                                                  :
                                                  <div>
                                                       <p>+213 333 333  33</p>
                                                  </div>
                                        }
                                   </div>
                              </div>

                              <div>
                                   <div className='emailss' >
                                        {
                                             !loading ?
                                                  ci.hasOwnProperty('email') ?
                                                       //Object.keys(ci.email).map((key, index) => <p> {ci.email[key]} </p>)
                                                       <>
                                                            <div>
                                                                 <div>
                                                                      <p className="tiitle">{t('email1')} </p>
                                                                      <p>{ci.email[1]}</p>
                                                                 </div>
                                                                 <div>
                                                                      <p className="tiitle">{t('email2')} </p>
                                                                      <p>{ci.email[2]}</p>
                                                                 </div>
                                                            </div>
                                                       </>
                                                       :
                                                       ""
                                                  :
                                                  ""
                                        }
                                   </div>
                              </div>

                              <div>
                                   <div className='emailss' >
                                        {
                                             !loading ?
                                                  ci.hasOwnProperty('email') ?
                                                       //Object.keys(ci.email).map((key, index) => <p> {ci.email[key]} </p>)
                                                       <>
                                                            <div>
                                                                 <div>
                                                                      <p className="tiitle">{t('email3')} </p> <p>{ci.email[3]}</p>
                                                                 </div>
                                                                 <div>
                                                                      <p className="tiitle">{t('email4')} </p> <p>{ci.email[4]}</p>
                                                                 </div>
                                                            </div>
                                                       </>

                                                       :
                                                       <div className='emailss'></div>
                                                  :
                                                  <p></p>
                                        }
                                   </div>
                              </div>

                              <div className='adr'>
                                   <p className="tiitle">{t('adr')}  </p>

                                   <p>
                                        {
                                             cookies.get('i18next') === 'ar' ? ci.address__ar : (cookies.get('i18next') === 'fr' ? ci.address__fr : ci.address__en)
                                        }
                                   </p>
                              </div>

                         </div>

                    </div>
               </div>


               <div className='first' >
                    <div className="line" ></div>
                    <a href="/"> <img src={ci.logo_dark} alt='anouar el sabah' /></a>
                    <div className="line" ></div>
               </div>

               <div className="second">
                    <a href={ci.facebook} target='_blank'> <img src={fb} alt="Anouar el Sabah" /> </a>
                    <a href={ci.instagram} target='_blank'> <img src={ig} alt="Anouar el Sabah" /> </a>
                    <a href="" target='_blank'> <img src={yt} alt="Anouar el Sabah" /> </a>
                    <a href={ci.twitter} target='_blank'> <img src={tw} alt="Anouar el Sabah" /> </a>
               </div>
          </div>
     )
}

export default FooterSocialLink

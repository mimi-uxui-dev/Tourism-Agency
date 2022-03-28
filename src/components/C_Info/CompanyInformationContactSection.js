import React, { useContext } from 'react'

import { MyContextProvider, MyContext } from '../context/MyContext'
import { useTranslation } from 'react-i18next'
import fcbBig from '../assets/img/icons/bigIcons/FacebookLogo.svg'
import igBig from '../assets/img/icons/bigIcons/InstagramLogo.svg'
import twBig from '../assets/img/icons/bigIcons/TwitterLogo.svg'
import phoneBig from '../assets/img/icons/bigIcons/Phone.svg'
import faxBig from '../assets/img/icons/bigIcons/PhoneDisconnect.svg'
import mailBig from '../assets/img/icons/bigIcons/Envelope.svg'
import pinBig from '../assets/img/icons/bigIcons/MapPin.svg'
import cookies from 'js-cookie'


const CompanyInformation = ({ lang }) => {
       const { t } = useTranslation()

       const [companiesInfo, setCompaniesInfo] = useContext(MyContext)


       return (
              <MyContextProvider>

                     <div className='ci_inner_containerB' >

                            <div className='ci_txt_content' >
                                   <h1 className='headerTitle' >{t('CI_Reach_out')}</h1>
                                   <p className='category' > {t('CI_Contact_us')} </p>

                                   <div className='contact_info' >
                                          <div>
                                                 <img src={mailBig} alt="" />
                                                 <p>{companiesInfo.email}</p>
                                          </div>
                                          <div>
                                                 <img src={phoneBig} alt="" />
                                                 <p>{companiesInfo.phone}</p>
                                          </div>
                                          <div>
                                                 <img src={faxBig} alt="" />
                                                 <p>{companiesInfo.fax}</p>
                                          </div>
                                   </div>

                                   <div className='adr' >
                                          <img src={pinBig} alt="" />
                                          <p> ${companiesInfo.email}</p>
                                   </div>

                                   <div className='sm' >
                                          <a href={companiesInfo.facebook}>
                                                 <img src={fcbBig} alt="" />
                                          </a>

                                          <a href={companiesInfo.instagram} >
                                                 <img src={igBig} alt="" />
                                          </a>

                                          <a href={companiesInfo.twitter} >
                                                 <img src={twBig} alt="" />
                                          </a>
                                   </div>
                            </div>

                            <div className='iframeContainer'  >
                                   <iframe
                                          frameBorder="0"
                                          scrolling="no"
                                          marginHeight="0"
                                          marginWidth="0"
                                          src={`https://maps.google.com/maps?q=${companiesInfo.latitude},${companiesInfo.longtitude}&z=15&output=embed`}
                                   >
                                   </iframe>
                            </div>

                     </div>

              </MyContextProvider>
       )
}

export default CompanyInformation

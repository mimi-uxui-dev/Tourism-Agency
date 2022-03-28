import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import cover from '../assets/img/Reservation/cover.png'
import plane from '../assets/img/Navbar/paper-plane.svg'
import { NavbarContext } from "../context/NavbarContext";
import ServicesComponent from './services2/ServicesComponent'
import Services_comp from './services/Services_comp'

import i1 from '../assets/img/Visa/01.png'
import i2 from '../assets/img/Visa/02.png'
import i3 from '../assets/img/Visa/03.png'
import i4 from '../assets/img/Visa/04.png'
import grayLayer from '../assets/img/Visa/Image.svg'


function VisaCompo() {
     const { t } = useTranslation()

     const { toggleFunction } = useContext(NavbarContext)

     return (
          <div className='BlogsPageMain'>

               <div className="header">

                    <div className="img_container">
                         <img className='first' src={cover} alt="" />
                         <img className='second' src={cover} alt="" />

                         <div className='text'>
                              <p className='text1'>  {t('Studyvisafiles')} </p>
                              <p className='text2'> {t('Studyvisafiles_p')} </p>
                         </div>
                    </div>
               </div>

               <div className="reservationGrid">
                    <div>
                         <h2> {t('etudeVisa_h1')} </h2>
                         <p>
                              {t('etudeVisa_p')}
                         </p>
                         <p>
                              {t('etudeVisa_p1')}
                         </p>
                    </div>

                    <div className='reservation_grid' >
                         <div className='compo' >
                              <div className="compo_overlay">

                                   <div className="img_container3">
                                        <img src={grayLayer} className='zero' alt="" />
                                        <img className='first' src={i1} alt="" />
                                        <img className='second' src={i1} alt="" />
                                   </div>
                              </div>

                              <div className="compo_content">

                                   <div className='textt0'>
                                        <h4>Study Visa Files</h4>
                                        <p>Fees &nbsp; <span>6000 DA</span></p>
                                   </div>

                                   <p className='textt' >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum est, quis lectus sagittis auctor at sed eget.
                                   </p>

                                   <div className="contact" onClick={toggleFunction}>
                                        <span>Contact</span> <img src={plane} alt="" />
                                   </div>

                              </div>
                         </div>

                         <div className='compo' >
                              <div className="compo_overlay">

                                   <div className="img_container3">
                                        <img src={grayLayer} className='zero' alt="" />
                                        <img className='first' src={i2} alt="" />
                                        <img className='second' src={i2} alt="" />
                                   </div>
                              </div>

                              <div className="compo_content">

                                   <div className='textt0'>
                                        <h4>travel insurance</h4>
                                        <p>Fees &nbsp; <span>6000 DA</span></p>
                                   </div>

                                   <p className='textt' >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum est, quis lectus sagittis auctor at sed eget.
                                   </p>

                                   <div className="contact" onClick={toggleFunction}>
                                        <span>Contact</span> <img src={plane} alt="" />
                                   </div>

                              </div>
                         </div>

                         <div className='compo' >
                              <div className="compo_overlay">

                                   <div className="img_container3">
                                        <img src={grayLayer} className='zero' alt="" />
                                        <img className='first' src={i3} alt="" />
                                        <img className='second' src={i3} alt="" />
                                   </div>
                              </div>

                              <div className="compo_content">

                                   <div className='textt0'>
                                        <h4>Study visa</h4>
                                        <p>Fees &nbsp; <span>6000 DA</span></p>
                                   </div>

                                   <p className='textt' >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum est, quis lectus sagittis auctor at sed eget.
                                   </p>

                                   <div className="contact" onClick={toggleFunction}>
                                        <span>Contact</span> <img src={plane} alt="" />
                                   </div>

                              </div>
                         </div>

                         <div className='compo' >
                              <div className="compo_overlay">

                                   <div className="img_container3">
                                        <img src={grayLayer} className='zero' alt="" />
                                        <img className='first' src={i4} alt="" />
                                        <img className='second' src={i4} alt="" />
                                   </div>
                              </div>

                              <div className="compo_content">

                                   <div className='textt0'>
                                        <h4>electronic visa</h4>
                                        <p>Fees &nbsp; <span>6000 DA</span></p>
                                   </div>

                                   <p className='textt' >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum est, quis lectus sagittis auctor at sed eget.
                                   </p>

                                   <div className="contact" onClick={toggleFunction}>
                                        <span>Contact</span> <img src={plane} alt="" />
                                   </div>

                              </div>
                         </div>

                    </div>

               </div>


               <ServicesComponent />

               <Services_comp />

          </div>
     )
}

export default VisaCompo

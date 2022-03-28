import React, { useContext } from 'react'
import cover from '../assets/img/Reservation/cover.png'
import plane from '../assets/img/Navbar/paper-plane.svg'
import { NavbarContext } from "../context/NavbarContext";
import ServicesComponent from './services2/ServicesComponent'
import Services_comp from './services/Services_comp'
import { useTranslation } from 'react-i18next'


function ReservationCompo() {
       const { t } = useTranslation()
     const { modalIsOpen } = useContext(NavbarContext);
     const { toggleFunction } = useContext(NavbarContext)

     return (
          <div className='BlogsPageMain'>

               <div className="header">

                    <div className="img_container">
                         <img className='first' src={cover} alt="" />
                         <img className='second' src={cover} alt="" />

                         <div className='text'>
                              <p className='text1'> {t('Reserheader')} </p>
                              <p className='text2'> {t('Reserv_p')} </p>
                         </div>
                    </div>
               </div>

               <div className="reservationGrid">
                    <div>
                         <h2> {t('reserv_h2')} </h2>
                         <p> {t('reserv_p')} </p>
                         
                         <br />
                         <h2> {t('FlightTicket_h2')} </h2>
                         <p> {t('FlightTicket_p')} </p>
                    </div>

                    <div className='reserve'>
                         <p> {t('ResInfo')} </p>
                         <div className="contact2" onClick={toggleFunction}>
                              <span> {t('Contact')} </span> <img src={plane} alt="" />
                         </div>
                    </div>
               </div>


               <ServicesComponent />

               <Services_comp />

          </div>
     )
}

export default ReservationCompo

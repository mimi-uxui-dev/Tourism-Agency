import React from 'react'
import moment from 'moment';
import calendar from '../../assets/img/Services/Calendar.svg'
import dash from '../../assets/img/Services/dash.svg'
import clock from '../../assets/img/Services/clock.svg'
import noimg from '../../assets/img/noimg.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { ReactPlaceholder } from 'react-placeholder';

function ServiceCard({ data }) {
     const { t } = useTranslation()

     const diffDates = (date1, date2) => {
          let date1_ = moment(date1, 'YYYY-MM-DD')
          let date2_ = moment(date2, 'YYYY-MM-DD')

          return date2_.diff(date1_, 'days')
     }

     const getDayAndMonth = (date) => {
          let check = moment(date)
          let day = check.format('DD')
          let month = check.format('MMMM')

          return day + ' ' + month
     }

     const getImage = (type) => {
          if (data.hasOwnProperty('services_media')) {
               //console.log(data.services_media.filter(e => e.type__en === type))
               const x = data.services_media.filter(e => e.type__en === type)
               return x[0]?.link_original
               //return x[0].link_original
          }
          return noimg
     }

     return (
          <div className='serviceCard'>
               <div>

                    <div className="img_container">

                         <Link to={{ pathname: `/services/category/${data.service_categories_id}/service/${data.id}`, state: { data: data } }}>
                              {
                                   data.hasOwnProperty('services_media') && data.services_media.length === 0 ? <>
                                        <img className='first' src={noimg} alt="" />
                                        <img className='second' src={noimg} alt="" />
                                   </> : <>
                                        <img className='first' src={getImage('Cover')} alt="" />
                                        <img className='second' src={getImage('Cover')} alt="" />
                                   </>
                              }
                         </Link>
                    </div>
               </div>

               <div className='text' >
                    <div className='cardHeader'>
                         <p className='loc'>{cookies.get('i18next') === 'ar' ? data.location_address__ar : (cookies.get('i18next') === 'fr' ? data.location_address__fr : data.location_address__en)}   </p>
                         <div>
                              <img src={calendar} alt="" />
                              <p>  {getDayAndMonth(data.date_at)} <img src={dash} alt="" /> {getDayAndMonth(data.date_to)} </p>
                         </div>
                    </div>
                    <div className="cardContent">
                         <h3>
                              <Link to={{ pathname: `/services/category/${data.service_categories_id}/service/${data.id}`, state: { data: data } }}> {cookies.get('i18next') === 'ar' ? data.name__ar : (cookies.get('i18next') === 'fr' ? data.name__fr : data.name__en)} </Link>
                         </h3>
                         <p> {cookies.get('i18next') === 'ar' ? data.description__ar : (cookies.get('i18next') === 'fr' ? data.description__fr : data.description__en)} </p>
                    </div>
                    <div className='card_days_price'>
                         <div className='days' > <img src={clock} alt="" /> {diffDates(data.date_at, data.date_to)} &nbsp; <span> {t('days')} </span> </div>
                         <span className='pipe'>|</span>
                         <div className='price'> {t('from')}  {data.price} DA </div>
                    </div>
               </div>
          </div>
     )
}

export default ServiceCard

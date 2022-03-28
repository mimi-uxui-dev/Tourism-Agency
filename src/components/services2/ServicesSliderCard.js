import React from 'react'
import noimg from '../../assets/img/noimg.png'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { Link } from 'react-router-dom';

function ServicesSliderCard({ data }) {
     const { t } = useTranslation()

     return (
          <Link to={`/services/category/${data.service_categories_id}/service/${data.id}`}>
               <div className='service_card__container'>
                    <p className='tag' > {cookies.get('i18next') === 'ar' ? data.location_address__ar : (cookies.get('i18next') === 'fr' ? data.location_address__fr : data.location_address__en)} </p>
                    {
                         data.services_media.length === 0 ? <img src={noimg} alt="" /> : <img src={data.services_media[0].link} alt="" />
                    }
                    <div className="text">
                         <p className='title'> {cookies.get('i18next') === 'ar' ? data.name__ar : (cookies.get('i18next') === 'fr' ? data.name__fr : data.name__en)}  </p>
                         <div> <span className='duration' >
                              {cookies.get('i18next') === 'ar' ? data.duration__ar : (cookies.get('i18next') === 'fr' ? data.duration__fr : data.duration__en)}
                         </span>
                              |
                              <span className='price'>{t('from')} {data.price}</span> </div>
                    </div>
               </div>
          </Link>
     )
}

export default ServicesSliderCard

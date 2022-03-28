import React from 'react'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

function ServicesCategoryCard({ data }) {
     const { t } = useTranslation()


     return (
          <div className="services_c_card__container" >

               <div className="img_container">
                    <img className='first' src={data.photo} alt="" />
                    <img className='second' src={data.photo} alt="" />

               </div>
               <div>
                    <p className="title"> {cookies.get('i18next') === 'ar' ? data.name__ar : (cookies.get('i18next') === 'fr' ? data.name__fr : data.name__en)} </p>
                    <p className="count">{data.count_services} {t('Offres_count')} </p>
               </div>
          </div>
     )
}

export default ServicesCategoryCard

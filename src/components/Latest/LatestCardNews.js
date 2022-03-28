import React from 'react'
import calendar from '../../assets/img/Blogs/Calendar.svg'
import flag from '../../assets/img/Blogs/FlagBanner.svg'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

function LatestCardNews({ data }) {
     const { t } = useTranslation()

     return (
          <div className='latestCard__container'>
               <div className='top'>
                    <Link to={`/blogs/${data.id}`}><img src={data.photo} alt="Anouar el Sabah" /></Link>

                    <div className='top_'>
                         <div><img src={calendar} alt="" /><span>{moment(data.created_at).format("DD MMMM YYYY")}</span></div>
                         <div><img src={flag} alt="" /><span> {t('News')} </span> </div>
                    </div>
               </div>
               <div className='bottom'>
                    <Link to={`/blogs/${data.id}`} ><h2> {cookies.get('i18next') === 'ar' ? data.title__ar : (cookies.get('i18next') === 'fr' ? data.title__fr : data.title__en)}  </h2></Link>
                    <h6> {data.author} </h6>
               </div>
          </div>
     )
}

export default LatestCardNews

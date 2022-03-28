import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function FourZeroFour() {
     const { t } = useTranslation()

     return (
          <div className='page404Container' >
               <div className='page404InnerContainer'>
                    <h1> 404 </h1>
                    <p> {t('404_desc')} </p>
                    <div>
                         <Link to='/' > {t('404_getBackHome')} </Link>

                    </div>
               </div>
          </div>
     )
}

export default FourZeroFour

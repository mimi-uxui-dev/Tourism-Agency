import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FAQS } from '../../sevices/globalServices'
import Faq from './Faq'

import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

function FaqsCompo() {
     const { t } = useTranslation()

     const [faqs, setFaqs] = useState([])
     const [ready, setReady] = useState(false)

     const fetchData = async () => await axios.get(FAQS()).then(data => setFaqs(data.data.data))

     useEffect(() => {
          fetchData()
          setReady(true)
     }, [])

     return (
          <div className='faqs__container'>

               <div className='header' >
                    <div>
                         <h3> {t('FAQS')} </h3>
                         <h6>  {t('FAQS_p')} </h6>
                    </div>
                    <div className='cta'>
                         <h6> {t('FAQS_')} </h6>
                    </div>
               </div>

               <div className="faqs__innerContainer">
                    {faqs.length !== 0 ? faqs.map(f => <Faq ready={ready} data={f} />) : ''}
               </div>
          </div>
     )
}

export default FaqsCompo

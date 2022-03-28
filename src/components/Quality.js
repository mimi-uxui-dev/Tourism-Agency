/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import i1 from '../assets/img/quality/1.svg'
import i2 from '../assets/img/quality/2.svg'
import i3 from '../assets/img/quality/3.svg'
import parser from 'html-react-parser'
import { SUPPORT } from '../sevices/globalServices'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

function Quality() {
     const { t } = useTranslation()

     const [supp, setSupp] = useState([])

     const fetchDAta = async () => await axios.get(SUPPORT()).then(data => setSupp(data.data.data))

     useEffect(() => {
          fetchDAta()
     }, [])



     return (
          <div className='quality__container' >

               {
                    supp.length === 0 ? '' : supp.map(s => <div key={s.id} data-aos="flip-down" >
                         <img src={s.icon} alt="Anouar el sabah" />
                         {cookies.get('i18next') === 'ar' ? parser(`${s.description__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${s.description__fr}`) : parser(`${s.description__en}`))}
                    </div>)
               }



          </div>
     )
}

export default Quality

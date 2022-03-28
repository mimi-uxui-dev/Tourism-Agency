import React, { useState } from 'react'
import parser from "html-react-parser"
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"

function Faq({ data, ready }) {
     const { t } = useTranslation()

     const [active, setActive] = useState(false)

     const toggle = () => setActive(!active)

     return (

          <div className={active ? 'activeAccordion' : 'accordion'} onClick={toggle} >
               <div className="accordipnHeading">
                    <div className="container">
                         <div className="smallLine"></div>
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                              <p>{cookies.get('i18next') === 'ar' ? data.question__ar : (cookies.get('i18next') === 'fr' ? data.question__fr : data.question__en)} </p>
                         </ReactPlaceholder>
                    </div>
               </div>

               <div className='accordionContent' style={active ? { opacity: 1, height: 'fit-content' } : { opacity: 0, height: '0' }}>
                    <div className="container">
                         <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={2} color='#CFCFCF'>
                              <p>{cookies.get('i18next') === 'ar' ? parser(`${data.answer__ar}`) : (cookies.get('i18next') === 'fr' ? parser(`${data.answer__fr}`) : parser(`${data.answer__en}`))}</p>
                         </ReactPlaceholder>
                    </div>
               </div>

          </div>
     )
}

export default Faq

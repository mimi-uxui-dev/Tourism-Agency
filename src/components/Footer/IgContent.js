import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { COMPANY_INFORMATION } from '../../sevices/globalServices'

function IgContent() {
     const [ci, setCi] = useState([])

     const fetchData = async () => {
          const r = await axios.get(COMPANY_INFORMATION(1))
          setCi(r.data.data)
     }

     useEffect(() => {
          fetchData()
     }, [])

     return (
          <div className='igContent__container'>
               <img src={ci.logo_dark} />
          </div>
     )
}

export default IgContent

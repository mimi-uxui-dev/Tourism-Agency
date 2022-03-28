import React, { useState, useEffect } from 'react'
import MapComponent from '../MapComponent'
import { UNITS, COMPANY_INFORMATION, UNIT } from '../../sevices/globalServices'
import axios from 'axios'
import noimg from '../../assets/img/noimg.png'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"
import CoverPlaceholder from './../Placeholders/CoverPlaceholder'

function Units() {
     const { t } = useTranslation()
     const [units, setUnits] = useState([])
     const [ci, setCI] = useState([])
     const [active, setActive] = useState(0)
     const [lat, setLat] = useState(36.0711622)
     const [long, setLong] = useState(4.7592358)
     const [isLoading, setIsLoading] = useState(false)
     const [unit, setUnit] = useState({})
     const [ready, setReady] = useState(false)

     const fetchData = async () => {
          const result = await axios
               .get(UNITS())
               .then(res => setUnits(res.data.data))
     }

     const fetchCI = async () => {
          await axios.get(`${COMPANY_INFORMATION(1)}`).then(r => setCI(r.data.data))
     }

     useEffect(() => {
          setIsLoading(true)
          fetchData()
          fetchCI()
          setIsLoading(false)
          handleClick()
          setReady(true)
     }, [])

     const handleClick = async (id, lat, long, u) => {
          setLat(lat)
          setLong(long)
          setActive(id)
          // await axios.get(UNIT(active)).then(data => setUnit(data.data.data))
          setUnit(u)
     };

     const getImage = (type) => {
          if (ci.hasOwnProperty('photo')) {
               // console.log(this.state.ci.photo.filter(e => e.type === type))
               const x = ci.photo.filter(e => e.type === type)
               return x[0] ? x[0].link : noimg
          }
          return noimg
     }

     return (
          <div className='units__container'>
               <div className="header">
                    <div className="img_container" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))", zIndex: "10" }} >
                         {/* <img className='first' src={ci.photo === undefined ? "" : ci.photo[1].link} alt="" />
                         <img className='second' style={{ mixBlendMode: "overlay" }} src={ci.photo === undefined ? "" : ci.photo[1].link} alt="" /> */}
                         <ReactPlaceholder showLoadingAnimation={true} customPlaceholder={<CoverPlaceholder />} type='media' rows={0} ready={ready} >
                              <img className='first' src={getImage('Units Cover')} alt="" />
                              <img className='second' style={{ mixBlendMode: "overlay" }} src={getImage('Units Cover')} alt="" />
                         </ReactPlaceholder>
                         <div className='text'>
                              <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                                   <p className='text1'> {t('Units0')} </p>
                              </ReactPlaceholder>
                              <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                                   <p className='text2'>{t('Units_p')}</p>
                              </ReactPlaceholder>
                         </div>
                    </div>
               </div>

               <div className='units__content'>

                    <div className="units__list">
                         <div className="head">
                              <h3>{t('Findusonthislocations')}</h3>
                              <p> {t('Findusonthislocations_p')} </p>
                         </div>
                         <div className='units__' >
                              {
                                   units.map(u => <div
                                        onClick={() => handleClick(u.id, u.latitude, u.longitude, u)}
                                        key={u.id}
                                        className={u.id === active ? "unit__container__active" : "unit__container"}
                                   >
                                        <ReactPlaceholder type='rect' showLoadingAnimation={true} ready={ready} color='#CFCFCF' style={{ width: 80, height: 80 }}>
                                             <img src={u.photo} alt="" />
                                        </ReactPlaceholder>
                                        <div>
                                             <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                                                  <h6>{cookies.get('i18next') === 'ar' ? u.name__ar : (cookies.get('i18next') === 'fr' ? u.name__fr : u.name__en)} </h6>
                                                  <p>{cookies.get('i18next') === 'ar' ? u.address__ar : (cookies.get('i18next') === 'fr' ? u.address__fr : u.address__en)} </p>
                                             </ReactPlaceholder>
                                        </div>
                                   </div>)
                              }
                         </div>
                    </div>

                    <div className='units__map'>
                         <MapComponent lat={lat} long={long} id={active} myUnit={unit} />
                    </div>
               </div>

          </div>
     )
}

export default Units

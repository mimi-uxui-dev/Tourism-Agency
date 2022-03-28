import React, { useState } from 'react'
import { DatePicker } from 'antd';
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

function SearchBar() {
     const { t } = useTranslation()
     const [active, setActive] = useState('umrah')
     const [location, setLocation] = useState('')
     const [groupeSize, setGroupeSize] = useState(null)
     const [startDate, setStartDate] = useState(null)


     const handleFilterBlogs = (type) => setActive(type)

     let history = useHistory();

     const activeStyle = {
          background: 'white',
          backdropFilter: "blur(40px)",
          transition: "all ease 0.5s"
     }

     const notActiveStyle = {
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(40px)",
          transition: "all ease 0.5s",
          color: "white",
          letterSpacing: "0.02%x",
          fontWeight: "500"
     }

     const handleSubmit = async e => {
          e.preventDefault()
          const form_data = {
               destination: location,
               date: startDate === "Invalid date" ? null : moment(startDate).format('YYYY-MM-DD'),
               // endDate: moment(endDate).format('YYYY-MM-DD'),
               groupe_size: groupeSize
          }

          // console.log('form data TO SEND', form_data)

          if (form_data.destination === "" && form_data.date === "Invalid date" && form_data.groupe_size === null) {
               toast.error("Please fill in your information", {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true
               })
          } else {
               history.push('/results', form_data)
          }
     }

     return (
          <div className='searchBar' >
               <div className="container">
                    <h2 className="searchbar__title" > Where Are We Going ? </h2>

                    <div className='top '>
                         <h3 className='h3Rounded' onClick={() => handleFilterBlogs('umrah')} style={active === 'umrah' ? activeStyle : notActiveStyle}> {t('UMRAH')} </h3>
                         <h3 onClick={() => handleFilterBlogs('voyage')} style={active === 'voyage' ? activeStyle : notActiveStyle}> {t('VOYAGE_ORG')} </h3>
                         <h3 className='h3Rounded_' onClick={() => handleFilterBlogs('visa')} style={active === 'visa' ? activeStyle : notActiveStyle}> {t('VISA')} </h3>
                    </div>
                    <form action="">
                         <div className='bottom'>

                              <div>
                                   <h4>{t('LOCATION')} </h4>
                                   <input
                                        type="text"
                                        placeholder={t('Enter_your_destinations')}
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        required
                                   />
                              </div>

                              <div>
                                   <h4>{t('DATE')} </h4>
                                   <DatePicker
                                        defaultValue={null}
                                        value={startDate}
                                        onChange={e => setStartDate(e)}
                                   />

                              </div>

                              <div>
                                   <h4>{t('PEOPLE')} </h4>
                                   <input
                                        type="text"
                                        placeholder={t('how_many_people')}
                                        value={groupeSize}
                                        onChange={e => setGroupeSize(e.target.value)}
                                   />
                              </div>

                              <div type='submit' onClick={handleSubmit} className="flip">
                                   <a href='/'>
                                        <div className="front">{t('ExploreNow')} </div>
                                        <div className="back">{t('ExploreNow')}</div>
                                   </a>
                              </div>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default SearchBar
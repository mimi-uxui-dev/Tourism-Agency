import React, { useState, useEffect } from 'react'
import search from '../assets/img/Navbar/bigMenu.svg'
import CloseBtn from '../assets/img/Products/XCircle.svg'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'
import { SEARCH } from '../sevices/globalServices'

import { withRouter, useHistory } from 'react-router-dom'

import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import SearchPage from './SearchPage'


function Search() {
     const { t } = useTranslation()
     let history = useHistory();

     const [searchTerm, setSearchTerm] = useState('')
     const [selectedValue, setSelectedValue] = useState('')
     const [searchRes, setSearchRes] = useState([])

     const handleSubmit = async e => {
          e.preventDefault()

          const form_data = {
               table: selectedValue,
               term: searchTerm
          }

          // const res = await axios.post(SEARCH(), form_data).then(r => setSearchRes(r.data))

          history.push('/results', form_data)

     }

     return (

          <>

               <form className='nav_navigation_search' onSubmit={handleSubmit} >

                    <img src={search} alt="" />

                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={t('SEARCH_BTN_PLACEHOLDER')} required />

                    <select
                         className='searchSelect'
                         value={selectedValue}
                         onChange={e => setSelectedValue(e.target.value)}
                         required
                    >
                         <option value="">Select</option>
                         <option value="products">Products</option>
                         <option value="services">Services</option>
                         <option value="blogs">Blogs</option>
                    </select>

                    <button type="submit"> {t('SEARCH_BTN_LABEL')} </button>

               </form>

          </>

     )
}

export default withRouter(Search)

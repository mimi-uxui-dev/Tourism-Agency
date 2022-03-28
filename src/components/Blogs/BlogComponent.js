import React, { useState } from 'react'
import CloseBtn from '../../assets/img/Products/XCircle.svg'
import parse from 'html-react-parser'
import Modal from 'react-modal';
import cookies from 'js-cookie'
import moment from 'moment'
import pen from '../../assets/img/Blogs/Pen.svg'
import clock from '../../assets/img/Blogs/Clock.svg'


function BlogComponent({ blog }) {

 
     const textArabic = { textAlign: (cookies.get('i18next') === 'ar') ? "right" : "left", marginRight: (cookies.get('i18next') === 'ar') ? "16px" : "0" }


     return (

          <div className='blogCompo'>
               <img src={blog.photo} alt="" onClick={openModal} />
               <div>
                    <p className='blogCompoTitle' onClick={openModal} style={textArabic} >{cookies.get('i18next') === 'ar' ? blog.title__ar : (cookies.get('i18next') == 'fr' ? blog.title__fr : blog.title__en)}</p>
                    <div>
                         <div><img src={pen} alt="" /><span>Admin</span> </div>
                         <div><img src={clock} alt="" /><span>{moment(blog.updated_at).format('DD/MM/YYYY')} </span> </div>
                    </div>
               </div>

          </div>
     )
}

export default BlogComponent

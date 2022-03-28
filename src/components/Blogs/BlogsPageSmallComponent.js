import React, { useState, useEffect } from 'react'
import blogPic from '../../assets/img/Blogs/blogPic.jpg'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import moment from 'moment'
import f from '../../assets/img/Blogs/f.png'
import c from '../../assets/img/Blogs/c.png'
import { Link } from 'react-router-dom'
import { NEWS_ID } from '../../sevices/globalServices'
import axios from "axios"

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"
import BlogPlaceholder2 from './../Placeholders/BlogPlaceholder2'

function BlogsPageSmallComponent({ blog, ready }) {
     const { t } = useTranslation()

     const [blogg, setblogg] = useState(blog)

     useEffect(() => {
          setblogg(blog)
     }, [])

     return (
          <div className='blogsPageSmallCompContainer'>

               <div className='top_s'>
                    <ReactPlaceholder showLoadingAnimation={true} customPlaceholder={<BlogPlaceholder2 />} type='media' ready={ready} >

                         <Link to={`/news/${blogg.id}`}><img className='blog__img' src={blogg.photo} alt="" /></Link>
                    </ReactPlaceholder>

                    <div className='top__data'>
                         <div><img src={c} alt='' /> {moment(blogg.created_at).format('DD MMMM YYYY')} </div>
                         <div><img src={f} alt='' /> {blogg.type === 'blog' ? t('BlogsType') : t('NewsType')} </div>
                    </div>
               </div>

               <div className='bottom_s'>
                    <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                         <Link to={`/news/${blogg.id} `}><p className='title'>{cookies.get('i18next') === 'ar' ? blogg.title__ar : (cookies.get('i18next') === 'fr' ? blogg.title__fr : blogg.title__en)} </p> </Link>
                    </ReactPlaceholder>
                    <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                         <p>{blogg.author}</p>
                    </ReactPlaceholder>

               </div>

          </div>
     )
}

export default BlogsPageSmallComponent

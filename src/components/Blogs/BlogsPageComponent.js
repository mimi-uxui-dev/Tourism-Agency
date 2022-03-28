import React, { useState } from 'react'
import blogPic from '../../assets/img/Blogs/blogPic.jpg'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import moment from 'moment'
import f from '../../assets/img/Blogs/f.png'
import c from '../../assets/img/Blogs/c.png'

import { Link } from 'react-router-dom'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"
import BlogPlaceholder from './../Placeholders/BlogPlaceholder';

function BlogsPageComponent({ blog, ready }) {
    const { t } = useTranslation()

    return (
        <div className='blogsPageCompContainer'>

            <div className='top'>
                <ReactPlaceholder showLoadingAnimation={true} customPlaceholder={<BlogPlaceholder />} type='media' ready={ready} >
                    <Link to={{
                        pathname: `/blogs/${blog.id}`,
                        state: blog.id
                    }} >
                        <img className='blog__img' src={blog.photo} alt="" />
                    </Link>
                </ReactPlaceholder>

                <div className='top__data'>
                    <div><img src={c} alt='' /> {moment(blog.created_at).format('DD MMMM YYYY')}</div>
                    <div><img src={f} alt='' /> {blog.type === 'blog' ? t('BlogsType') : t('NewsType')} </div>
                </div>

            </div>

            <div className='bottom'>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                    <Link to={{
                        pathname: `/blogs/${blog.id}`,
                        state: blog.id
                    }}
                    ><h3> {cookies.get('i18next') === 'ar' ? blog.title__ar : (cookies.get('i18next') === 'fr' ? blog.title__fr : blog.title__en)} </h3> </Link>
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                    <p>{blog.author}</p>
                </ReactPlaceholder>
            </div>

        </div>
    )
}

export default BlogsPageComponent

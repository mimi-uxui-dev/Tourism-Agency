import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogComponent from './BlogComponent'
import { Link } from 'react-router-dom'
import { BLOG_LIMIT } from '../../sevices/globalServices'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

function BlogsSection() {
     const { t } = useTranslation()

     const textArabic = { textAlign: (cookies.get('i18next') === 'ar') ? "right" : "left" }

     const [blogs, setBlogs] = useState([])
     const fetchData = async () => {
          const result = await axios.get(BLOG_LIMIT())
               .then(res => setBlogs(res.data.data))
     }
     useEffect(() => {
          fetchData()
     }, [])

     return (
          <div className='blogSectionContainer'>
               <div className='blogSectionInnerContainer'>
                    <p className='BlogSectionTitle' style={textArabic}> {t('BLOG_SEC_TITLE')} </p>
                    {
                         blogs.map(blog => <BlogComponent key={blog.id} blog={blog} />)
                    }
                    <Link to='/blogs' className='blogSection_seeAllPosts'> {t('BLOG_SEC_Link')} </Link>
               </div>
          </div>
     )
}

export default BlogsSection

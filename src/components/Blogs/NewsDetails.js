import React, { useState, useEffect } from 'react'
import cover from '../../assets/img/Blogs/cover.png'
import c from '../../assets/img/Blogs/c.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NEWS_LIMIT, NEWS_ID } from '../../sevices/globalServices'
import BlogsPageSmallComponent from './BlogsPageSmallComponent'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import parse from 'html-react-parser'
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"
import CoverPlaceholder from './../Placeholders/CoverPlaceholder'

function NewsDetails() {
     const { t } = useTranslation()
     const [active, setActive] = useState("")
     const [blogsLatest, setBlogsLatest] = useState([])
     const [blog, setBlog] = useState([])
     const [ready, setReady] = useState(false)

     const fetchData = async () => await axios.get(NEWS_LIMIT(3)).then(res => setBlogsLatest(res.data.data))

     const blog_id_params = useParams()

     const blog_id = blog_id_params.id

     const fetchBlog = async (blog_id) => await axios.get(NEWS_ID(blog_id)).then(res => setBlog(res.data.data))

     useEffect(() => {
          fetchData()
          fetchBlog(blog_id)
          setReady(true)

     }, [blog_id])

     const aboutus_header = {
          position: 'relative',
          maxWidth: '100%',
          height: '50vh',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 79.4%), linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.808966) 57.29%, #FFFFFF 100%), url(${blog.photo}) center center/cover no-repeat `,
          backgroundSize: 'cover'
     }

     const handleFilterBlogs = (type) => setActive(type)

     var settings = {
          dots: false,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 1200,
          slidesToShow: blog.hasOwnProperty('newsEvent_media') && blog.newsEvent_media.length < 4 ? blog.newsEvent_media.length : 4,
          slidesToScroll: 1,
          arrows: false,

          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1
                    }
               },
               {
                    breakpoint: 600,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1
                    }
               },
               {
                    breakpoint: 480,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1
                    }
               }
          ]
     };

     let slickRef = React.createRef()

     return (
          <div className='BlogsPageMain'>
               <ReactPlaceholder showLoadingAnimation={true} customPlaceholder={<CoverPlaceholder />} type='media' rows={0} ready={ready} >

                    <div style={aboutus_header}></div>
               </ReactPlaceholder>

               <div className='blogD_grid'>
                    <div>
                         <div className="blogDContent">
                              <div><img src={c} alt="" /> <p> {moment(blog.created_at).format('DD MMMM YYYY')} </p> </div>
                              <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>

                                   <h2> {cookies.get('i18next') === 'ar' ? blog.title__ar : (cookies.get('i18next') === 'fr' ? blog.title__fr : blog.title__en)} </h2>
                              </ReactPlaceholder>

                              <p> {t('By')} : {blog.author} </p>
                              <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={5} color='#CFCFCF'>

                                   <div className='blog_d_content'> {cookies.get('i18next') === 'ar' ? parse(`${blog.content__ar}`) : (cookies.get('i18next') === 'fr' ? parse(`${blog.content__fr}`) : parse(`${blog.content__en}`))} </div>
                              </ReactPlaceholder>

                         </div>

                         <br />
                         <br />
                         <div className='blogsmedia'>
                              <SimpleReactLightbox>

                                   <SRLWrapper>
                                        <Slider ref={slickRef} {...settings}>
                                             {
                                                  'newsEvent_media' in blog ?
                                                       blog.newsEvent_media.length === 0 ? '' : blog.newsEvent_media.map(p => <div className='blogsmediadiv'>
                                                            <img src={p.link} data-attribute="SRL" alt="" />
                                                       </div>) :
                                                       ''
                                             }
                                        </Slider>
                                   </SRLWrapper>
                              </SimpleReactLightbox>
                         </div>

                    </div>

                    <div className="blogDSidebar">
                         <div className='head' >
                              <h3> {t('LATEST')} </h3>
                              <Link to='/blogs'> {t('ViewAllPost')} </Link>
                         </div>
                         <div className="latestBlogs">
                              {blogsLatest.map(b => {
                                   return <BlogsPageSmallComponent ready={ready} blog={b} />
                              })}
                         </div>
                    </div>
               </div>
          </div>
     )

}

export default NewsDetails

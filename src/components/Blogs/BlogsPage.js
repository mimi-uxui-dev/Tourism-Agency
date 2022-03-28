import React from 'react'
import BlogsPageComponent from './BlogsPageComponent'
import noimg from '../../assets/img/noimg.png'
import { BLOGS, BLOG_NEWS, NEWS, COMPANY_INFORMATION } from '../../sevices/globalServices'
import axios from 'axios'

import glass from '../../assets/img/Blogs/glass.png'
import ServicesComponent from '../services2/ServicesComponent'
import Services_comp from '../services/Services_comp'
import Pagination from 'react-js-pagination'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"
import CoverPlaceholder from './../Placeholders/CoverPlaceholder'

class BlogsPage extends React.Component {
    t = this.props.t
    /* const[blogs, setBlogs] = useState([])
    const[searchedTerm, setSearchedTerm] = useState('')
    const[active, setActive] = useState("") */

    state = {
        blogs: [],
        searchedTerm: '',
        active: '',
        news: [],
        ci: [],
        isLoading: false,
        ready: false

    }

    fetchData = async (pageNumber = 1) => {
        const r = await axios.get(`${BLOGS()}?page=${pageNumber}`)
        this.setState({ blogs: r.data.data })
    }

    fetchNews = async () => {
        const r = await axios.get(`${NEWS()}`)
        this.setState({ news: r.data.data })
    }

    fetchCI = async () => {
        await axios.get(`${COMPANY_INFORMATION(1)}`).then(r => this.setState({ ci: r.data.data }))
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.fetchData()
        this.fetchNews()
        this.fetchCI()
        this.setState({ isLoading: false })
        this.setState({ ready: true })
    }

    handleSubmit = (event) => {
        this.setState({ searchedTerm: event.target.value })
    }

    handleFilterBlogs = (type) => this.setState({ active: type })

    // REnder List
    renderList = () => {
        return (
            <>
                <div className='blogs__container'>
                    {

                        Object.keys(this.state.blogs).length === 0 ?

                            <h1>Loading</h1> : this.state.blogs.data === [] ?
                                <h1>hold on</h1>
                                :
                                this.state.blogs.data.filter(blog => blog && (blog.author.toLowerCase().includes(this.state.searchedTerm.toLowerCase()) ||
                                    blog.title__fr.toLowerCase().includes(this.state.searchedTerm.toLowerCase()))
                                ).map(filteredBlog => (<BlogsPageComponent ready={this.state.ready} blog={filteredBlog} />))
                    }
                </div>

                <ul className="list-group">
                    <Pagination
                        totalItemsCount={this.state.blogs.total}
                        activePage={this.state.blogs.current_page}
                        itemsCountPerPage={this.state.blogs.per_page}
                        onChange={(pageNumber = 1) => this.fetchData(pageNumber)}
                        itemClass='page-item'
                        linkClass='page-link'
                        firstPageText={this.t('First')}
                        lastPageText={this.t('Last')}
                    />
                </ul>
            </>
        )
    }
    // END render list

    getImage = (type) => {
        if (this.state.ci.hasOwnProperty('photo')) {
            // console.log(this.state.ci.photo.filter(e => e.type === type))
            const x = this.state.ci.photo.filter(e => e.type === type)
            return x[0] ? x[0].link : noimg
        }
        return noimg
    }

    render() {
        return (
            <div className='BlogsPageMain'>

                <div className="header">

                    <div className="img_container">
                        <ReactPlaceholder showLoadingAnimation={true} customPlaceholder={<CoverPlaceholder />} type='media' rows={0} ready={this.state.ready} >
                            <img className='first' src={this.getImage('Blog Cover')} alt="" />
                            <img className='second' src={this.getImage('Blog Cover')} alt="" />
                        </ReactPlaceholder>


                        <div className='text'>
                            <ReactPlaceholder showLoadingAnimation={true} type='text' ready={this.state.ready} rows={1} color='#CFCFCF'>
                                <p className='text1'>
                                    {this.t('BlogsType')}
                                </p>
                            </ReactPlaceholder>
                            <ReactPlaceholder showLoadingAnimation={true} type='text' ready={this.state.ready} rows={1} color='#CFCFCF'>
                                <p className='text2'>
                                    {this.t('blog_p')}
                                </p>
                            </ReactPlaceholder>
                        </div>
                    </div>
                </div>

                <div className="blogPageContainer">
                    <div className="innerheader">
                        <div className='text'>
                            <h3>{this.t('Results')} </h3>
                            <p>{this.t('blog_p')}</p>
                        </div>
                        <div className='searchBolgs'>
                            <img src={glass} alt="" />
                            <input type="text" onChange={this.handleSubmit} placeholder={this.t('searchingFor')} />
                        </div>
                    </div>

                    <div className='blogs__grid'>
                        <div>
                            {this.state.blogs && this.renderList()}
                        </div>

                        <div className="blogs__filter">
                            <h3> {this.t('Categories')}</h3>
                            <div className='blog__filter'>
                                <div>
                                    <a href='/blogs' > {this.t('BlogsType')} </a>
                                    <ReactPlaceholder showLoadingAnimation={true} type='text' ready={this.state.ready} rows={1} color='#CFCFCF'>
                                        <p> {this.state.blogs.hasOwnProperty('data') ? this.state.blogs.data.length : ''} </p>
                                    </ReactPlaceholder>
                                </div>
                                <div>
                                    <a href='/news'>{this.t('NewsType')}</a>
                                    <ReactPlaceholder showLoadingAnimation={true} type='text' ready={this.state.ready} rows={1} color='#CFCFCF'>
                                        <p> {this.state.news.hasOwnProperty('data') ? this.state.news.data.length : ''} </p>
                                    </ReactPlaceholder>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ServicesComponent />

                <Services_comp />

            </div>
        )
    }

}

export default BlogsPage

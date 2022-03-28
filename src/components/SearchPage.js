import React, { Component } from 'react'
import parse from 'html-react-parser'
import axios from 'axios'
import { SEARCH } from '../sevices/globalServices'
import Pagination from 'react-js-pagination'
import cookies from 'js-cookie'
import Modal from 'react-modal';
import CloseBtn from '../assets/img/Products/XCircle.svg'
import cover from '../assets/img/Blogs/cover.png'

import moment from 'moment';
import calendar from '../assets/img/Services/Calendar.svg'
import dash from '../assets/img/Services/dash.svg'
import clock from '../assets/img/Services/clock.svg'
import noimg from '../assets/img/noimg.png'
import { Link } from 'react-router-dom'


class SearchPage extends Component {

     state = {
          data: []
     }

     form_data = this.props.location.state

     async getData(pageNumber = 1) {
          var bodyFormDAta = new FormData()
          bodyFormDAta.append('destination', this.form_data.destination)
          bodyFormDAta.append('date', this.form_data.date)
          bodyFormDAta.append('groupe_size', this.form_data.groupe_size)

          const r = await axios.post(`${SEARCH()}?page=${pageNumber}`, bodyFormDAta)
          this.setState({ data: r.data })
          // console.log('SEARCH R: ', r)
     }

     diffDates = (date1, date2) => {
          let date1_ = moment(date1, 'YYYY-MM-DD')
          let date2_ = moment(date2, 'YYYY-MM-DD')

          return date2_.diff(date1_, 'days')
     }

     getDayAndMonth = (date) => {
          let check = moment(date)
          let day = check.format('DD')
          let month = check.format('MMMM')

          return day + ' ' + month
     }

     componentDidMount() {
          //  console.log('FORM DATA', this.props)
          this.getData()
     }

     renderList = () => {

          return (
               <ul className="list-group" >
                    {
                         <React.Fragment>
                              <h1> {cookies.get('i18next') === 'ar' ? "خدماتنا" : (cookies.get('i18next') === 'fr' ? "Nos Services" : "Our Services")} </h1>
                              <div className='searchPage_grid'>
                                   {
                                        Object.keys(this.state.data).length === 0 ?
                                             <h2> {cookies.get('i18next') === 'ar' ? "لا توجد نتائج" : (cookies.get('i18next') === 'fr' ? "Aucun résultat" : "No Results")}  </h2> :
                                             (
                                                  this.state.data.services.data.length === 0 ?
                                                       <h2> {cookies.get('i18next') === 'ar' ? "لا توجد نتائج" : (cookies.get('i18next') === 'fr' ? "Aucun résultat" : "No Results")}  </h2> : this.state.data.services.data.map(d => <div className='text' >

                                                            <div className='cardHeader'>
                                                                 <p className='loc'> {cookies.get('i18next') === 'ar' ? d.location_address__ar : (cookies.get('i18next') === 'fr' ? d.location_address__fr : d.location_address__en)} </p>
                                                                 <div>
                                                                      <img src={calendar} alt="" />
                                                                      <p>  {moment(d.date_at).format('YYYY/MM/DD')} &nbsp; - &nbsp; {moment(d.date_to).format('YYYY/MM/DD')} </p>
                                                                 </div>
                                                            </div>

                                                            <div className="cardContent">
                                                                 <h3>
                                                                      <Link to={{ pathname: `/services/category/${d.service_categories_id}/service/${d.id}`, state: { data: d } }}>
                                                                           {cookies.get('i18next') === 'ar' ? d.name__ar : (cookies.get('i18next') === 'fr' ? d.name__fr : d.name__en)}
                                                                      </Link>
                                                                 </h3>
                                                            </div>
                                                            <div className='card_days_price'>
                                                                 <div className='days' > <img src={clock} alt="" /> &nbsp; {this.diffDates(d.date_at, d.date_to)} &nbsp; <span>{/* {this.t('days')} */}</span> </div>
                                                                 <span className='pipe'> &nbsp; | &nbsp; </span>
                                                                 <div className='price'> {cookies.get('i18next') === 'ar' ? "من" : (cookies.get('i18next') === 'fr' ? "De" : "From")} {d.price} DZD </div>
                                                            </div>
                                                       </div>)
                                             )
                                   }
                              </div>

                              <h1> {cookies.get('i18next') === 'ar' ? "عروضنا" : (cookies.get('i18next') === 'fr' ? "Nos Offres" : "Our Offers")} </h1>
                              <div className='searchPage_grid'>
                                   {
                                        Object.keys(this.state.data).length === 0 ?
                                             <h2>{cookies.get('i18next') === 'ar' ? "لا توجد نتائج" : (cookies.get('i18next') === 'fr' ? "Aucun résultat" : "No Results")}</h2> :
                                             (
                                                  this.state.data.offers.data.length === 0 ?
                                                       <h2> {cookies.get('i18next') === 'ar' ? "لا توجد نتائج" : (cookies.get('i18next') === 'fr' ? "Aucun résultat" : "No Results")} </h2> :
                                                       this.state.data.offers.data.map(d => <div className='text' >
                                                            <div className='cardHeader'>
                                                                 <p className='loc'> {cookies.get('i18next') === 'ar' ? d.location_address__ar : (cookies.get('i18next') === 'fr' ? d.location_address__fr : d.location_address__en)} </p>
                                                                 <div>
                                                                      <img src={calendar} alt="" />
                                                                      <p>  {this.getDayAndMonth(d.date_at)} <img src={dash} alt="" /> {this.getDayAndMonth(d.date_to)} </p>
                                                                 </div>
                                                            </div>
                                                            <div className="cardContent">
                                                                 <h3>
                                                                      <Link to={{ pathname: `/services/category/${d.service_categories_id}/service/${d.id}`, state: { data: d } }}>
                                                                           {cookies.get('i18next') === 'ar' ? d.title__ar : (cookies.get('i18next') === 'fr' ? d.title__fr : d.title__en)}
                                                                      </Link>
                                                                 </h3>
                                                                 <p>{d.description__en}</p>
                                                            </div>
                                                            <div className='card_days_price'>
                                                                 <div className='days' > <img src={clock} alt="" /> {this.diffDates(d.date_at, d.date_to)} &nbsp; {/* <span>{this.t('days')}</span> */} </div>
                                                                 <span className='pipe'> &nbsp; | &nbsp; </span>
                                                                 <div className='price'>  {cookies.get('i18next') === 'ar' ? "من" : (cookies.get('i18next') === 'fr' ? "De" : "From")} {d.price} DZD </div>
                                                            </div>
                                                       </div>)
                                             )
                                   }
                              </div>

                              <Pagination
                                   totalItemsCount={this.state.data.services.total}
                                   activePage={this.state.data.services.current_page}
                                   itemsCountPerPage={this.state.data.services.per_page}
                                   onChange={(pageNumber = 1) => this.getData(pageNumber)}
                                   itemClass='page-item'
                                   linkClass='page-link'
                                   lastPageText=''
                                   firstPageText=''
                                   prevPageText='<'
                                   nextPageText='>'
                                   linkClassNext='linkClassNext'
                                   linkClassPrev='linkClassPrev'
                              />

                         </React.Fragment >
                    }
               </ul>
          )
     }



     render() {
          return (
               <div className='BlogsPageMain'>

                    <div className="header">

                         <div className="img_container">
                              <img className='first' src={cover} alt="" />
                              <img className='second' src={cover} alt="" />

                              <div className='text'>
                                   <p className='text1'>
                                        {cookies.get('i18next') === 'ar' ? "نتائج البحث" : (cookies.get('i18next') === 'fr' ? "Résultats de recherche" : "Search Results")}
                                   </p>
                                   <p className='text2'>
                                        {cookies.get('i18next') === 'ar' ? "لقد قمنا بتغطيتك في قسم البحث لدينا" : (cookies.get('i18next') === 'fr' ? "Nous vous avons couvert dans notre section de recherche" : "We got you covered in our search section")}
                                   </p>
                              </div>
                         </div>
                    </div>

                    <div>

                         <div className="container">
                              <div className="row">
                                   <div className="col-md-12">

                                        {this.state.data.services && this.renderList()}

                                   </div>
                              </div>
                         </div>

                    </div>

               </div>
          )
     }

}

export default SearchPage

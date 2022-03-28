import React, { useEffect, useState } from 'react'
import { useParams, useHistory, withRouter } from 'react-router-dom'
import axios from 'axios'
import { SERVICE_C_ID, COMPANY_INFORMATION, SEARCH_SERVICES } from '../../sevices/globalServices'
import ServiceCard from './ServiceCard'
import ServiceCard2 from './ServiceCard2'
import 'antd/dist/antd.css';
import sortBy from '../../assets/img/Services/SortAscending.svg'
import sH from '../../assets/img/Services/SlidersHorizontal.png'
import { DatePicker, Slider } from 'antd';
import moment from 'moment'
import Pagination from 'react-js-pagination'
import { toast } from 'react-toastify'
import noimg from '../../assets/img/noimg.png'
import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"
import CoverPlaceholder from './../Placeholders/CoverPlaceholder'
const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

class ServicesCategory extends React.Component {

     t = this.props.t

     state = {
          listOfSer: [],
          minMoney: null,
          maxMoney: 800000,
          location: '',
          range: null,
          submitted: false,
          listOfSearch: [],
          sortAll: false,
          sortAllData: [],
          toggleFilter: false,
          ci: [],
          isLoading: false,
          ready: false
     }

     id = this.props.match.params.id;

     fetchData = async (pageNumber = 1) => {

          await axios.get(`${SERVICE_C_ID(this.id)}`).then(data => this.setState({ listOfSer: data.data.data }))
     }

     fetchCI = async () => {
          await axios.get(COMPANY_INFORMATION(1)).then(data => this.setState({ ci: data.data.data }))
     }

     moneySlider = val => {
          this.setState({ minMoney: val[0] })
          this.setState({ maxMoney: val[1] })
     }

     maxHandler = e => {
          this.setState({ maxMoney: e.target.value })
     }

     minHandler = e => {
          this.setState({ minMoney: e.target.value })
     }

     handleRange = e => {
          this.setState({ range: e })
     }

     handleLocation = e => {
          this.setState({ location: e.target.value })
     }

     handleSubmit = async (e, pageNumber = 1) => {

          e.preventDefault()

          var formData = new FormData()

          formData.append('services_categories_id', this.id)
          formData.append('destination', this.state.location === "" ? null : this.state.location)
          formData.append('date_at', moment((this.state.range === null || this.state.range[0]._d === "Invalid date") ? null : (this.state.range[0]._d).format('YYYY-MM-DD') === "Invalid date") ? null : this.state.range[0]._d)
          formData.append('date_to', moment((this.state.range === null || this.state.range[1]._d === "Invalid date") ? null : (this.state.range[1]._d).format('YYYY-MM-DD') === "Invalid date") ? null : this.state.range[1]._d)
          formData.append('price_min', this.state.minMoney === null ? 0 : this.state.minMoney)
          formData.append('price_max', this.state.maxMoney === null ? 0 : this.state.maxMoney)

          // formData.append('price_max', this.state.maxMoney)

          /*   for (var [key, value] of formData.entries()) {
                 console.log('--->', key, value);
            } */

          try {
               await axios.post(`${SEARCH_SERVICES()}`, formData).then(data => {
                    // console.log('RES RECHERCHE', data)

                    toast.success("Searching...", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true,
                         autoClose: 1000,
                    })

                    this.setState({ submitted: true, listOfSearch: data.data.services })

                    toast.success("Done.", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true,
                         autoClose: 1200,
                    })
               }).catch(e => {
                    // console.log('error from submit 0 ', e)
               })

          } catch (error) {
               // console.log('error from submit 1 ', error)
          }

          /* console.log('list of search 01', this.state.listOfSearch) */

     }

     handleReset = () => {
          this.setState({ location: '' })
          this.setState({ minMoney: 2000 })
          this.setState({ maxMoney: 800000 })
          this.setState({ submitted: false })
     }

     onSorting(option) {
          switch (option) {
               case 'all':
                    let allList = this.state.listOfSer.services.sort((a, b) => { return a.created_at >= b.created_at ? 1 : -1 })
                    this.setState({ sortAllData: allList })
                    this.setState({ sortAll: false })
                    break
               case 'name':
                    let nameList = this.state.listOfSer.services.sort((a, b) => { return a.name__fr >= b.name__fr ? 1 : -1 })
                    this.setState({ sortAllData: nameList })
                    this.setState({ sortAll: true })
                    break
               case 'date':
                    let dateList = this.state.listOfSer.services.sort((a, b) => { return new Date(a.date_at) >= new Date(b.date_at) ? 1 : -1 })
                    this.setState({ sortAllData: dateList })
                    this.setState({ sortAll: true })
                    break
               case 'price':
                    let priceList = this.state.listOfSer.services.sort((a, b) => { return a.price >= b.price ? 1 : -1 })
                    this.setState({ sortAllData: priceList })
                    this.setState({ sortAll: true })
                    break
               case 'duration':
                    let durationList = this.state.listOfSer.services.sort((a, b) => { return a.duration__en >= b.duration__en ? 1 : -1 })
                    this.setState({ sortAllData: durationList })
                    this.setState({ sortAll: true })
                    break
               default:
                    console.log('Default')
                    break
          }

          // console.log("Sorted list", sortedList)
     }

     toggleFilter = () => this.setState({ toggleFilter: !this.state.toggleFilter })

     componentDidMount() {
          this.fetchData()
          this.fetchCI()
          window.scrollTo(0, 0)
          this.setState({ ready: true })
     }

     getImage = (type) => {
          if (this.state.ci.hasOwnProperty('photo')) {

               // console.log(this.state.ci.photo.filter(e => e.type === type))
               const x = this.state.ci.photo.filter(e => e.type === type)
               return x[0] ? x[0].link_original : noimg
          }
          return noimg
     }

     render() {

          return (
               <div className='servicesCategoryID__container'>

                    <div className="img_container" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1))", zIndex: "10" }}  >
                         <ReactPlaceholder showLoadingAnimation={true} customPlaceholder={<CoverPlaceholder />} type='media' rows={0} ready={this.state.ready} >
                              <img className='second' src={this.getImage('Services Cover')} alt="" />
                              <img className='first' style={{ mixBlendMode: "overlay" }} src={this.getImage('Services Cover')} alt="" />
                         </ReactPlaceholder>
                         <div>
                              <p className='text1'> {this.state.listOfSer.name__en}  </p>
                              <p className='text2'> {this.state.listOfSer.description__en} </p>
                         </div>
                    </div>

                    <div className="servCat_container">
                         <div className="header">
                              <div>
                                   {<h3>{this.state.listOfSer.hasOwnProperty('services') && this.state.listOfSer.services.length} {this.t('Results')}</h3>}
                                   <p> {this.t('Filter_p')} </p>
                              </div>

                              <div className='sortBy sortByhover sortByMob'>
                                   Sort by <img src={sortBy} alt="" />
                                   <div className='sortByList'>
                                        <li onClick={() => this.onSorting('all')} > {this.t('all_filter')}</li>
                                        <li onClick={() => this.onSorting('name')} > {this.t('name_filter')}</li>
                                        <li onClick={() => this.onSorting('date')} > {this.t('date_filter')}</li>
                                        <li onClick={() => this.onSorting('price')} > {this.t('price_filter')}</li>
                                   </div>
                              </div>

                              <div className='sorrtFilterMob'>

                                   <div className='sortBy sortByhover'>
                                        Sort by <img src={sortBy} alt="" />
                                        <div className='sortByList'>
                                             <li onClick={() => this.onSorting('all')} > {this.t('all_filter')}</li>
                                             <li onClick={() => this.onSorting('name')} > {this.t('name_filter')}</li>
                                             <li onClick={() => this.onSorting('date')} > {this.t('date_filter')}</li>
                                             <li onClick={() => this.onSorting('price')} > {this.t('price_filter')}</li>
                                        </div>
                                   </div>

                                   <button className='filterBy' onClick={this.toggleFilter}>
                                        {this.t('Filter')}
                                        <img src={sH} alt="" />
                                   </button>

                              </div>
                         </div>

                         <div className="data">

                              <div className='formContainer' id="hna"  >
                                   <form onSubmit={this.handleSubmit}>
                                        <div>
                                             <label htmlFor="destination">{this.t('dest')}</label>
                                             <div>
                                                  <input
                                                       type="text"
                                                       placeholder={this.t('Chooselocation')}
                                                       onChange={this.handleLocation}
                                                       value={this.state.location}
                                                  />
                                             </div>
                                        </div>

                                        <hr style={{ width: '100%' }} />

                                        <div className='moneySlider'>
                                             <label htmlFor="price">{this.t('PriceRange')} <span> &nbsp; (.00) (DZD)</span> </label> <br />
                                             <Slider
                                                  tooltipVisible={true}
                                                  range={{ draggableTrack: true }}
                                                  defaultValue={[this.state.minMoney, this.state.maxMoney]}
                                                  min={2000}
                                                  max={1000000}
                                                  onChange={this.moneySlider}
                                                  value={[this.state.minMoney, this.state.maxMoney]}
                                                  required
                                             />
                                        </div>

                                        <div className='minmax' >
                                             <div>
                                                  <label htmlFor="min">Min</label>
                                                  <div>
                                                       <input type="number" value={this.state.minMoney} placeholder='0 Da' onChange={this.minHandler} />
                                                  </div>
                                             </div>
                                             <div>
                                                  <label htmlFor="max">Max</label>
                                                  <div>
                                                       <input type="number" value={this.state.maxMoney} placeholder='0 Da' onChange={this.maxHandler} />
                                                  </div>
                                             </div>
                                        </div>

                                        <hr style={{ width: '100%' }} />

                                        <div className='rangeContainerr'>
                                             <p>{this.t('from')}</p>
                                             <RangePicker
                                                  defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                                                  format={dateFormat}
                                                  onChange={this.handleRange}
                                                  value={this.state.range}
                                                  Picker={[moment("2020-03-09 13:00"), moment("2020-03-27 13:17")]}
                                                  required
                                             />
                                        </div>

                                        <div className='filterByContainer' >

                                             <div className='filterBy reset' onClick={this.handleReset} >
                                                  {this.t('Reset')}
                                             </div>

                                             <button type="submit" className='filterBy' onSubmit={this.handleSubmit}>
                                                  {this.t('Filter')}
                                                  <img src={sH} alt="" />
                                             </button>
                                        </div>


                                   </form>
                              </div>

                              <div className='formContainer' style={this.state.toggleFilter ? { display: "flex" } : { display: "none" }}>
                                   <form onSubmit={this.handleSubmit}>
                                        <div>
                                             <label htmlFor="destination">{this.t('dest')}</label>
                                             <div>
                                                  <input
                                                       type="text"
                                                       placeholder={this.t('Chooselocation')}
                                                       onChange={this.handleLocation}
                                                       value={this.state.location}
                                                  />
                                             </div>
                                        </div>

                                        <hr style={{ width: '100%' }} />

                                        <div className='moneySlider'>
                                             <label htmlFor="price">{this.t('PriceRange')} <span> &nbsp; (.00) (DZD)</span> </label> <br />
                                             <Slider
                                                  tooltipVisible={true}
                                                  range={{ draggableTrack: true }}
                                                  defaultValue={[this.state.minMoney, this.state.maxMoney]}
                                                  min={2000}
                                                  max={1000000}
                                                  onChange={this.moneySlider}
                                                  value={[this.state.minMoney, this.state.maxMoney]}
                                                  required
                                             />
                                        </div>

                                        <div className='minmax' >
                                             <div>
                                                  <label htmlFor="min">Min</label>
                                                  <div>
                                                       <input type="number" value={this.state.minMoney} placeholder='0 Da' onChange={this.minHandler} />
                                                  </div>
                                             </div>
                                             <div>
                                                  <label htmlFor="max">Max</label>
                                                  <div>
                                                       <input type="number" value={this.state.maxMoney} placeholder='0 Da' onChange={this.maxHandler} />
                                                  </div>
                                             </div>
                                        </div>

                                        <hr style={{ width: '100%' }} />

                                        <div className='rangeContainerr'>
                                             <p>{this.t('from')}</p>
                                             <RangePicker
                                                  defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                                                  format={dateFormat}
                                                  onChange={this.handleRange}
                                                  value={this.state.range}
                                                  Picker={[moment("2020-03-09 13:00"), moment("2020-03-27 13:17")]}
                                                  required
                                             />
                                        </div>

                                        <div className='filterByContainer' >
                                             <div className='filterBy reset' onClick={this.handleReset} >
                                                  {this.t('Reset')}
                                             </div>

                                             <button type="submit" className='filterBy' onSubmit={this.handleSubmit}>
                                                  {this.t('Filter')}
                                                  <img src={sH} alt="" />
                                             </button>
                                        </div>


                                   </form>
                              </div>

                              <div className='grid'>
                                   {
                                        !this.state.isLoading &&
                                        <React.Fragment>
                                             <h1> {this.t('OurServices')} </h1>

                                             {
                                                  this.state.submitted ?
                                                       <div className='searchPage_grid'>
                                                            <h3> {this.t('Search')} </h3>
                                                            {
                                                                 this.state.listOfSearch.map(d => <ServiceCard ready={this.state.ready} key={d.id} data={d} />)
                                                            }
                                                       </div> : null
                                             }

                                             <div className='searchPage_grid'>
                                                  <span style={this.state.submitted ? { display: "none" } : { display: 'inherit' }} >
                                                       {
                                                            !this.state.sortAll ?
                                                                 (this.state.listOfSer.hasOwnProperty('services') && this.state.listOfSer.services.length === 0 ?
                                                                      <h1>No Data</h1> : (this.state.listOfSer.hasOwnProperty('services') && this.state.listOfSer.services.map(d => <ServiceCard ready={this.state.ready} key={d.id} data={d} />)))
                                                                 :
                                                                 this.state.sortAllData.map(d => <ServiceCard ready={this.state.ready} key={d.id} data={d} />)
                                                       }
                                                  </span>
                                             </div>
                                             {/* <ul className="list-group">
                                                  <Pagination
                                                       totalItemsCount={this.state.blogs.total}
                                                       activePage={this.state.blogs.current_page}
                                                       itemsCountPerPage={this.state.blogs.per_page}
                                                       onChange={(pageNumber = 1) => this.fetchData(pageNumber)}
                                                       itemClass='page-item'
                                                       linkClass='page-link'
                                                       firstPageText='First'
                                                       lastPageText='Last'
                                                  />

                                             </ul> */}
                                        </React.Fragment >
                                   }
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}

export default withRouter(ServicesCategory)

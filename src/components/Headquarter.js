import React, { useState, useEffect } from 'react'
import MapComponent2 from './MapComponent'
import map from '../assets/img/Aboutus/Map.svg'
import { COMPANY_INFORMATION } from '../sevices/globalServices'
import axios from 'axios'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
const apiMaps = "AIzaSyBlllMSm32V0wcEqQrcD-FCoP433voN6HA";

class Headquarter extends React.Component {
     // eslint-disable-next-line react-hooks/rules-of-hooks
     t = this.props.t

     state = {
          ci: []
     }

     fetchData = () => axios.get(COMPANY_INFORMATION(1)).then(data => this.setState({ ci: data.data.data }))

     containerStyle = {
          position: 'relative',
          width: '100%',
          height: '100%',
     }

     componentDidMount() {
          this.fetchData()
     }

     render() {
          return (
               <div className='headerquarter'>
                    <div className='header'>
                         <div>
                              <h3> {this.t('Headquarter')} </h3>
                              <h6> {this.t('Headquarter_p')} </h6>
                         </div>
                    </div>

                    <div className="container">
                         <div className="adr">
                              <img src={map} alt="" />

                              <p>{cookies.get('i18next') === 'ar' ? this.state.ci.address__ar : (cookies.get('i18next') === 'fr' ? this.state.ci.address__fr : this.state.ci.address__en)} </p>
                         </div>
                         <div className='mapss' >
                              <Map
                                   className='maps'
                                   style={{ borderRadius: 13 }}
                                   containerStyle={this.containerStyle}
                                   google={this.props.google}
                                   zoom={18}
                                   initialCenter={{
                                        lat: this.state.ci.latitude,
                                        lng: this.state.ci.longtitude
                                   }}
                                   center={{
                                        lat: this.state.ci.latitude,
                                        lng: this.state.ci.longtitude
                                   }}
                              >
                              </Map>
                         </div>
                    </div>

               </div>
          )
     }
}

export default GoogleApiWrapper({ apiKey: apiMaps })(Headquarter)

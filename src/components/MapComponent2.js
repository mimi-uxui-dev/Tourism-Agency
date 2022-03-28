import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import pin from '../assets/img/Units/pin.svg'
import tel from '../assets/img/Units/tel.svg'
import mail from '../assets/img/Units/email.svg'
import noimg from '../assets/img/noimg.png'

const apiMaps = "AIzaSyBlllMSm32V0wcEqQrcD-FCoP433voN6HA";

const containerStyle = {
     position: 'relative',
     width: '100%',
     height: '100%',
}

class MapComponent2 extends React.Component {

     render() {


          return (

               <Map
                    className='maps'
                    style={{ borderRadius: 13 }}
                    containerStyle={containerStyle}
                    google={this.props.google}
                    zoom={18}

                    initialCenter={{
                         lat: 36.0687642,
                         lng: 4.7676092,
                    }}

                    center={{
                         lat: this.props.lat,
                         lng: this.props.long,
                    }}

               >

               </Map>

          )
     }
}

export default GoogleApiWrapper({ apiKey: apiMaps })(MapComponent2);
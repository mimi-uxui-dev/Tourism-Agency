import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import pin from '../assets/img/Units/pin.svg'
import tel from '../assets/img/Units/tel.svg'
import mail from '../assets/img/Units/email.svg'
import noimg from '../assets/img/noimg.png'
import { UNIT } from '../sevices/globalServices'
import axios from 'axios'



const apiMaps = "AIzaSyBlllMSm32V0wcEqQrcD-FCoP433voN6HA";

const containerStyle = {
     position: 'relative',
     width: '100%',
     height: '100%',
     myUnit: {}
}

class MapComponent extends React.Component {

     state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
     }

     onMarkerClick = (props, marker, e) => {
          this.setState({
               selectedPlace: props,
               activeMarker: marker,
               showingInfoWindow: true,
          });
     }

     render() {

          return (
               this.props.myUnit === undefined ? <h1>Loading</h1> :
                    <Map
                         className='maps'
                         style={{ borderRadius: 13 }}
                         containerStyle={containerStyle}
                         google={this.props.google}
                         zoom={18}
                         initialCenter={{
                              lat: this.props.lat,
                              lng: this.props.long,
                         }}
                         center={{
                              lat: this.props.lat,
                              lng: this.props.long
                         }}
                    >
                         <Marker
                              onClick={this.onMarkerClick}
                              name={'Anouar El Sabah'}
                              position={{ lat: this.props.lat, lng: this.props.long }}
                         />

                         <InfoWindow
                              marker={this.state.activeMarker}
                              visible={this.state.showingInfoWindow}>
                              <div className='infoWindoo' >
                                   {
                                        this.props.myUnit === undefined ? <img src={noimg} /> : <img src={this.props.myUnit.photo} />
                                   }

                                   <div className='data' >
                                        <h3> {this.props.myUnit.name__en} </h3>
                                        <p>  {this.props.myUnit.description__en} </p>
                                        <div>
                                             <div> <img src={pin} alt="" /> {this.props.myUnit.address__en}   </div>
                                             <div> <img src={tel} alt="" /> {this.props.myUnit.phone === null ? 'No Phone' : this.props.myUnit.phone}   </div>
                                             <div> <img src={mail} alt="" /> {this.props.myUnit.email === null ? 'no email' : this.props.myUnit.email}   </div>
                                        </div>
                                   </div>

                              </div>
                         </InfoWindow>
                    </Map>

          )
     }
}

export default GoogleApiWrapper({ apiKey: apiMaps })(MapComponent);


/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { PARTNERS } from '../sevices/globalServices'
import axios from 'axios'
import Slider from "react-slick";

function Partners() {

     const [partners, setPartners] = useState([])

     const fetchData = async () => {
          try {
               await axios.get(PARTNERS())
                    .then(a => setPartners(a.data.data))
                    .catch(err => console.log('err', err))
          } catch (err) {
               console.log('Parteners', err)
          }
     }

     useEffect(() => {
          fetchData()
     }, [])

     var settings = {
          dots: false,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 1500,
          slidesToShow: partners.length < 6 ? partners.length : 6,
          slidesToScroll: 1,
          arrows: false,
          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: partners.length < 3 ? partners.length : 3,
                         slidesToScroll: 3
                    }
               },
               {
                    breakpoint: 600,
                    settings: {
                         slidesToShow: partners.length < 2 ? partners.length : 2,
                         slidesToScroll: 2
                    }
               },
               {
                    breakpoint: 480,
                    settings: {
                         slidesToShow: partners.length < 2 ? partners.length : 2,
                         slidesToScroll: 2
                    }
               }
          ]
     };

     // data-aos="fade-up"
     return (
          <div id='partnersCotainer'  >
               <div className='partenersSlide'>
                    <Slider {...settings}>
                         {
                              partners.map(p =>
                                   <div className="partenr">
                                        <img className='partenrPic' key={p.id} src={p.photo} alt="Anouar el sabah" />
                                   </div>
                              )
                         }
                    </Slider>
               </div>
          </div>
     )
}

export default Partners
import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import axios from 'axios';
import { FEEDBACK } from '../sevices/globalServices'
import left from '../assets/img/Services/left.png'
import right from '../assets/img/Services/right.png'
import i2 from '../assets/img/Testimony/img2.svg'

function Testimony() {

     const [feedbackC, setFeedback] = useState([])

     const fetchData = async () => {
          const data = await axios.get(FEEDBACK())
          setFeedback(data.data.data)
     }

     useEffect(() => {
          fetchData()
     }, [feedbackC])

     var slider_settings = {
          dots: true,
          autoplay: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          speed: 500,
          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1
                    }
               },
               {
                    breakpoint: 700,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1
                    }
               },
          ]
     };

     const sliderRef = useRef()

     const n = () => sliderRef.current.slickNext()
     const p = () => sliderRef.current.slickPrev()

     return (
          <div className='feedback__container'>
               <div className='header'>
                    <div>
                         <h3>Testimonies</h3>
                         <h6>See what did our clients said about us</h6>
                    </div>
                    <div className='cta'>
                         <img src={left} onClick={p} alt='' />
                         <img src={right} onClick={n} alt='' />
                    </div>
               </div>

               <div className="slider__outerContainer">
                    <div className='slider__container'>
                         <Slider ref={sliderRef} {...slider_settings} style={{ direction: "ltr" }} >
                              {feedbackC.map(i => <div key={i.id} >
                                   <div className='top'>
                                        <img className="photo" src={i.photo} alt="Anouar el sabah" />
                                        <div>
                                             <p className='name'> {i.created_by} </p>
                                             <h6 className='job'> {i.role} </h6>
                                        </div>
                                   </div>

                                   <div className="text">
                                        <img className='i' src={i2} alt="" />
                                        {i.body}
                                        <img className='i2' src={i2} alt="" />
                                   </div>

                              </div>)}
                         </Slider>
                    </div>
               </div>

          </div>
     )
}

export default Testimony

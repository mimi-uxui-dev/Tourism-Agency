import React, { useState, useEffect, useRef } from 'react'
import Slider from "react-slick"
import TeamMemberCard from './TeamMemberCard'


function Members({ members, ready }) {
     var slider_settings = {

          dots: false,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 2500,
          slidesToShow: members.length < 4 ? members.length : 4,
          slidesToScroll: 1,
          arrows: true,
          responsive: [
               {
                    breakpoint: 1150,
                    settings: {
                         slidesToShow: members.length < 3 ? members.length : 3,
                         slidesToScroll: 1
                    }
               },
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: members.length < 2 ? members.length : 2,
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

     return (
          <div className='membersContainer0'>
               <div>
                    <Slider ref={sliderRef} {...slider_settings}>
                         {
                              members.length === 0 ? '' : members.map(team => <TeamMemberCard ready={ready} key={team.id} team={team} />)
                         }
                    </Slider>
               </div>
          </div>
     )
}

export default Members

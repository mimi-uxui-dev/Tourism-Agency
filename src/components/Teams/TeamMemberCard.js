import React from 'react'

import cookies from 'js-cookie'

import fcb from "../../assets/img/Team/Section/fcb.svg"
import lin from "../../assets/img/Team/Section/in.svg"
import tw from "../../assets/img/Team/Section/tw.svg"
import ig from "../../assets/img/Team/Section/ig.svg"
import yt from "../../assets/img/Team/Section/yt.svg"

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"

function TeamMemberCard({ team, ready }) {
     return (

          <div className='teamMemberCard'>

               <div className="profile">
                    <ReactPlaceholder type='rect' ready={false} color='#E0E0E0' style={{ width: 150, height: 150 }}>
                         <img className='profile_img' src={team.photo} alt='' />
                    </ReactPlaceholder>


                    <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                         <div className="sm">
                              {team.facebook === null ? null : <a href={team.facebook} target='_blank'><img src={fcb} alt="" /></a>}
                              {team.instagram === null ? null : <a href={team.instagram} target='_blank'><img src={ig} alt="" /></a>}
                              {team.linkedin === null ? null : <a href={team.linkedin} target='_blank'><img src={lin} alt="" /></a>}
                              {team.twitter === null ? null : <a href={team.twitter} target='_blank'><img src={tw} alt="" /></a>}
                              {team.youtube === null ? null : <a href={team.youtube} target='_blank'><img src={yt} alt="" /></a>}
                         </div>
                    </ReactPlaceholder>
               </div>

               <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={2} color='#CFCFCF'>
                    <p className="name">{team.full_name}</p>
                    <p className="position">{cookies.get('i18next') === 'ar' ? team.workplace__ar : (cookies.get('i18next') === 'fr' ? team.workplace__fr : team.workplace__en)}  </p>
               </ReactPlaceholder>

          </div>

     )

}
export default TeamMemberCard
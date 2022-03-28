import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { TEAMS } from "../../sevices/globalServices"
import Members from './Members'
import axios from 'axios'

import ReactPlaceholder from 'react-placeholder'
import "react-placeholder/lib/reactPlaceholder.css"

const Tab = styled.button`
     font-family: Nunito-Regular;
     font-style: normal;
     font-weight: normal;
     font-size: 14px;
     line-height: 19px;
     display: flex;
     align-items: center;
     text-align: center;
     letter-spacing: 0.02em;
     color: #B8B8B8;
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     padding: 8px 40px;
     width: 210px;
     height: 35px;
     border: 1px solid #B8B8B8;
     box-sizing: border-box;
     border-radius: 50px;
     margin: 0px 24px;
     cursor: pointer;
     
  ${({ active }) =>
          active &&
          `
          border: 1px solid #FFBA0B;
          color: #FFBA0B;
          background: rgba(255, 186, 11, 0.1);
  `}
`;

const ButtonGroup = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     margin: 50px 0 24px 0; 
`;

function Teams() {

     const { t } = useTranslation()

     const [teams, setTeams] = useState([])
     // const [active, setActive] = useState(1);
     const [ready, setReady] = useState(false)

     const [active, setActive] = useState(teams.length !== 0 ? teams[0].id : 3);

     const fetchData = async () => await axios.get(TEAMS()).then(res => setTeams(res.data.data))

     useEffect(() => {
          fetchData()
          setReady(true)
     }, [active])

     return (
          <div className='TeamsContainer'>
               <div className='header'>
                    <div>
                         <h3> {t('MeettheTeam')} </h3>
                         <h6> {t('AnouarElSabahFamily')}  </h6>
                    </div>
               </div>

               <div className='membersContainer'>
                    <ButtonGroup>
                         {
                              teams.map(d => (
                                   <Tab
                                        key={d.id}
                                        active={active === d.id}
                                        onClick={() => setActive(d.id)}
                                   >
                                        <ReactPlaceholder showLoadingAnimation={true} type='text' ready={ready} rows={1} color='#CFCFCF'>
                                             {cookies.get('i18next') === 'ar' ? d.name__ar : (cookies.get('i18next') === 'fr' ? d.name__fr : d.name__en)}
                                        </ReactPlaceholder>
                                   </Tab>
                              ))
                         }
                    </ButtonGroup>
                    <br />
                    <br />
                    {teams.map(d => (d.id === active) ? <div className='teamsouterContainer'>
                         <img className="teamsImg" src={d.photo} alt='' />
                         <Members ready={ready} members={d.members} />
                    </div> : null)}

               </div >
          </div>
     )
}

export default Teams

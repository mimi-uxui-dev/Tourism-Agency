/* eslint-disable */
import React, { useState } from 'react'
import BlogsSection from './BlogsSection'
import NewsSection from './NewsSection'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

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
     width: 200px;
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

function Latest() {
     const { t } = useTranslation()

     const data = [
          { id: 1, type: t('BlogsType'), typeData: <BlogsSection /> },
          { id: 2, type: t('NewsType'), typeData: <NewsSection /> },
     ]

     const [active, setActive] = useState(data[0].id);
     // data-aos="fade-up" 
     return (
          <div className='latest__container' >
               <div className='header'>
                    <div>
                         <h3>{t('LATEST')} </h3>
                         <h6>{t('LATEST_p')} </h6>
                    </div>
                    <div className='cta'>
                         <Link to={{ pathname: "/blogs", }}>{t('ViewAllPost')} </Link>
                    </div>
               </div>

               <div>
                    <>
                         <ButtonGroup>
                              {data.map(d => (
                                   <Tab
                                        key={d.id}
                                        active={active === d.id}
                                        onClick={() => setActive(d.id)}
                                   >
                                        {d.type}
                                   </Tab>
                              ))}
                         </ButtonGroup>
                         <br />
                         <br />
                         { // eslint-disable-next-line 
                         }
                         <p>{data.map(d => (d.id === active) ? d.typeData : null)}</p>
                    </>
               </div>

          </div>
     )
}

export default Latest

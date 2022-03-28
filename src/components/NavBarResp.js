import React, { useState, useEffect } from 'react'
import logo from '../assets/img/logo.svg'
import lang from '../assets/img/Navbar/Language.svg'
import i18nex from 'i18next'
import Translate from '../assets/img/Translate.svg'
import { useTranslation } from 'react-i18next'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import axios from "axios"
import { SERVICE_C } from '../sevices/globalServices'
import cookies from 'js-cookie'


const { SubMenu } = Menu;


function NavBarResp({ languages }) {
     const { t } = useTranslation()

     const [show, setShow] = useState(true)
     const [openMenu, setOpenMenu] = useState(true)
     const [servicesC, setServicesC] = useState([true])

     const toggleOpen = () => {
          setOpenMenu(!openMenu)
     }

     const controlNavBar = () => {
          if (window.scrollY > 100) {
               setShow(false)
          } else {
               setShow(true)
          }
     }

     const fetchServicesC = async () => await axios.get(SERVICE_C()).then(data => {
          setServicesC(data.data.data)
          // console.log('**************************** ', servicesC)
     })

     useEffect(() => {
          window.addEventListener('scroll', controlNavBar)

          fetchServicesC()
          return () => {
               window.removeEventListener('scroll', controlNavBar)
          }
     }, [servicesC])

     const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

     const [openKeys, setOpenKeys] = useState(['sub1']);

     const onOpenChange = keys => {
          const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
          if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
               setOpenKeys(keys);
          } else {
               setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
          }
     };

     const rootSubmenuKeys1 = ['sub2', 'sub3', 'sub4'];

     const [openKeys1, setOpenKeys1] = useState(['sub2']);

     const onOpenChange1 = keys => {
          const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
          if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
               setOpenKeys1(keys);
          } else {
               setOpenKeys1(latestOpenKey ? [latestOpenKey] : []);
          }
     };

     return (

          <>

               <div className={`navbar__container ${show && 'navbar__ColorChange'} `} id='web__nav1'>
                    <div className='menuBG'>
                         <div>
                              <div>

                                   <div onClick={toggleOpen} id="menuImg" className={!openMenu ? 'MenuLineCross' : 'MenuLine'}></div>
                              </div>
                         </div>
                    </div>

                    <div className="logo"><img src={logo} alt="" /></div>

                    <div className="lang">
                         <img src={lang}
                              alt="" />
                         <div className="nav2_list"
                              style={
                                   { display: "none" }
                              }>
                              {
                                   languages.map((lang) => (
                                        <li key={
                                             lang.code
                                        }>
                                             <button className='dropdown-item'
                                                  onClick={
                                                       () => i18nex.changeLanguage(lang.code)
                                                  }>
                                                  {
                                                       lang.name
                                                  } </button>
                                        </li>
                                   ))
                              } </div>
                    </div>

               </div>


               <div className={!openMenu ? 'myNavBarContainerMobile toggleOpenClass' : 'myNavBarContainerMobile'}>
                    <div className="nav2"><Link to='/'>{t('home')} </Link></div>

                    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 320 }}>
                         <SubMenu key="sub1" title={t('Services')}>
                              {
                                   servicesC.map(s => <Menu.Item key={s.id}>
                                        <Link to={`/services/category/${s.id}`}>
                                             {cookies.get('i18next') === 'ar' ? s.name__ar : (cookies.get('i18next') === 'fr' ? s.name__fr : s.name__en)}
                                        </Link>
                                   </Menu.Item>)
                              }
                              <Menu.Item key="visa"><Link to='/services/visa'>{t('StudyVisaFiles')}</Link></Menu.Item>
                              <Menu.Item key="reservation"><Link to='/services/reservation'>{t('Reservation')}</Link></Menu.Item>
                         </SubMenu>
                    </Menu>

                    <div className="nav2">
                         <Link to='/offers'> {t('Offers')} </Link>
                    </div>

                    <div className="nav2">
                         <Link to='/units'> {t('Units')}</Link>
                    </div>

                    <Menu mode="inline" openKeys={openKeys1} onOpenChange={onOpenChange1} style={{ width: 320 }}>
                         <SubMenu key="sub2" title={t('More')}>
                              <Menu.Item key="blogs"><Link to='/blogs'> {t('Blog_nav')} </Link></Menu.Item>
                              <Menu.Item key="news"><Link to='/news'>{t('News')} </Link></Menu.Item>
                              <Menu.Item key="about-us"><Link to='/about-us'>{t('About Us')} </Link></Menu.Item>
                         </SubMenu>
                    </Menu>

               </div>


          </>
     )
}

export default NavBarResp

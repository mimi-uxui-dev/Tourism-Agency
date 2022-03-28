import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18nex from 'i18next'
import search from '../assets/img/Search.png'
import lang from '../assets/img/Language.png'
import Modal from 'react-modal'
import plane from '../assets/img/Navbar/paper-plane.svg'
import { CONTACT_POST } from '../sevices/globalServices'
import { toast } from 'react-toastify';
import { Formik, useField, Form } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import CloseBtn from '../assets/img/ContactModal/X.svg'

import fcb from '../assets/img/ContactModal/fcb.svg'
import tw from '../assets/img/ContactModal/tw.svg'
import yt from '../assets/img/ContactModal/yt.svg'
import ig from '../assets/img/ContactModal/ig.svg'
import paperPlane from '../assets/img/ContactModal/paperPlane.svg'
import { withRouter, useHistory, useLocation } from 'react-router-dom'
import { NavbarContext } from "../context/NavbarContext"
import { COMPANY_INFORMATION, SERVICE_C } from '../sevices/globalServices'
import { DatePicker } from 'antd'
import moment from 'moment'
import cookies from 'js-cookie'
import { Menu } from 'antd'

function Navbar({ languages }) {
    const { SubMenu } = Menu;
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const { modalIsOpen } = useContext(NavbarContext);
    const { toggleFunction } = useContext(NavbarContext)
    const [servicesC, setServicesC] = useState([])

    const [modalIsOpen1, setIsOpen1] = useState(false);

    const toggleFunction1 = () => setIsOpen1(!modalIsOpen1)

    const [ci, setCi] = useState([])

    const [show, setShow] = useState(true)
    const [openMenu, setOpenMenu] = useState(true)

    const toggleOpen = () => {
        setOpenMenu(!openMenu)
    }

    const fetchDAta = async () => await axios.get(COMPANY_INFORMATION(1)).then(data => setCi(data.data.data))
    const fetchServicesC = async () => await axios.get(SERVICE_C()).then(data => {
        setServicesC(data.data.data)
        // console.log('**************************** ', servicesC)
    })

    const controlNavBar = () => {
        if (window.scrollY > 100) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavBar)
        return () => {
            window.removeEventListener('scroll', controlNavBar)
        }
    }, [])

    useEffect(() => {
        fetchDAta()
        fetchServicesC()
    }, [])

    const CustomInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <>
                <input {...field} {...props} /> {
                    meta.touched && meta.error ? (
                        <div className="error">
                            {meta.error}</div>
                    ) : null
                } </>
        );
    };

    const CustomTextArea = ({ label, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <>
                <textarea {...field} {...props} /> {
                    meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null
                }
            </>
        );
    };

    const CustomSelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <>
                <select {...field} {...props} /> {
                    meta.touched && meta.error ? (
                        <div className="error">
                            {meta.error}</div>
                    ) : null
                }
            </>
        );
    };

    const onsubmit = async (values, { setSubmitting, resetForm }) => {
        try {

            await axios.post(CONTACT_POST(), values).then(d => toast.success("Message sent with Success.", {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true
            })).catch(err => toast.error("Try again in a second", {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true
            }))

            setTimeout(() => {
                resetForm();
                setSubmitting(false);
            }, 1000);

        } catch (error) {
            console.error('SUBSCRIBE error', error)
        }
    }

    let history = useHistory();

    /** */
    const [active, setActive] = useState('umrah')
    const [location, setLocation] = useState('')
    const [groupeSize, setGroupeSize] = useState(null)
    const [startDate, setStartDate] = useState(null)

    const handleFilterBlogs = (type) => setActive(type)

    const activeStyle = {
        background: 'white',
        backdropFilter: "blur(40px)",
        transition: "all ease 0.5s"
    }

    const notActiveStyle = {
        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(40px)",
        transition: "all ease 0.5s"
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const form_data = {
            destination: location,
            date: startDate === "Invalid date" ? null : moment(startDate).format('YYYY-MM-DD'),
            // endDate: moment(endDate).format('YYYY-MM-DD'),
            groupe_size: groupeSize
        }
        // console.log('form data TO SEND', form_data)
        setTimeout(() => {
            setIsOpen1(!modalIsOpen1)
        }, 100)
        history.push('/results', form_data)
    }
    /** */

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

    const url = useLocation()

    // console.log("url", url)
    return (
        <>
            <Modal id='contactModal' isOpen={modalIsOpen}>
                <img className='closeBtnModal' src={CloseBtn} alt="" onClick={toggleFunction} />

                <div className='contact__modal contact__modal2'>
                    <div className='section'>
                        <div className='aa'> <Link to="/">
                            <img src={ci.logo_dark} style={{ maxWidth: "201px" }} alt="" />
                        </Link> </div>
                        <div className='bb'>
                            <div className="contact_rows">

                                <div className='contact_row'>
                                    <div>
                                        <p className="tiitle">
                                            {t('tourismServices')} </p>
                                        <div> {
                                            !loading ? (ci.length !== 0 && ci.hasOwnProperty('phone')) ? Object.keys(ci.phone.tourism_phone).map((key, index) => <p> {
                                                ci.phone.tourism_phone[key]
                                            } </p>) : <div>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                            </div> : <div>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                            </div>
                                        } </div>
                                    </div>

                                    <div>
                                        <p className="tiitle">
                                            {t('UmrahServices')}</p>
                                        <div> {
                                            !loading ? (ci.length !== 0 && ci.hasOwnProperty('phone')) ? Object.keys(ci.phone.omra_phone).map((key, index) => <p> {
                                                ci.phone.omra_phone[key]
                                            } </p>) : <div>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                            </div> : <div>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                                <p>+213 333 333  33</p>
                                            </div>
                                        } </div>
                                    </div>
                                </div>

                                <div className="yelloLine"></div>

                                <div className='contact_row'>
                                    <div className='emails'>

                                        {
                                            !loading ? ci.hasOwnProperty('email') ? Object.keys(ci.email).map((key, index) => <p> {
                                                ci.email[key]
                                            } </p>) : <div>
                                                <p>uxui.mimi@gmail.com</p>
                                                <p>uxui.mimi@gmail.com</p>
                                                <p>uxui.mimi@gmail.com</p>
                                                <p>uxui.mimi@gmail.com</p>
                                            </div> : <div>
                                                <p>uxui.mimi@gmail.com</p>
                                                <p>uxui.mimi@gmail.com</p>
                                                <p>uxui.mimi@gmail.com</p>
                                                <p>uxui.mimi@gmail.com</p>
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div className="yelloLine"></div>

                                <div className='contact_row adr'>
                                    <p className="tiitle">
                                        {t('adr')}</p>
                                    <div> {
                                        !loading ? ci.hasOwnProperty('address') ?
                                            ci.address : <p>Center ville, derrier HOTEL BENI HAMAD.
                                                Bordj Bou Arreridj 3400. ALGERIE</p>
                                            : <p>Center ville, derrier HOTEL BENI HAMAD.
                                                Bordj Bou Arreridj 3400. ALGERIE</p>
                                    } </div>
                                </div>
                            </div>
                        </div>
                        <div className='cc'>
                            {ci.facebook === null ? null : <a href={ci.facebook} target='_blank'><img src={fcb} alt="" /></a>}
                            {ci.instagram === null ? null : <a href={ci.instagram} target='_blank'><img src={ig} alt="" /></a>}
                            {ci.twitter === null ? null : <a href={ci.twitter} target='_blank'><img src={tw} alt="" /></a>}
                            {ci.youtube === null ? null : <a href={ci.youtube} target='_blank'><img src={yt} alt="" /></a>}
                        </div>
                    </div>
                    <div className='form__container'>
                        <div className='text'>
                            <h2>{t('SendUsAMsg')} </h2>
                            <p>{t('SendUsAMsg_p')} </p>
                        </div>
                        <Formik initialValues={
                            {
                                name: "",
                                email: "",
                                subject: "",
                                message: ""
                            }
                        }
                            validationSchema={
                                Yup.object({
                                    name: Yup.string().min(3, "Minimum 3 Characters").required("Required"),
                                    email: Yup.string().email("Inalid email").required("Required"),
                                    subject: Yup.string().oneOf(
                                        [
                                            "Reservations",
                                            "Questions",
                                            "Hotel booking",
                                            "Visa issue",
                                            "Other ...."
                                        ],
                                        "Invalid Subject"
                                    ).required("Required"),
                                    message: Yup.string().min(170, "minimum 170 Characters").required("Required")
                                })
                            }
                            onSubmit={onsubmit}>
                            {
                                (props) => (
                                    <Form>

                                        <CustomInput name="name" type="text" placeholder={t('Name')} />

                                        <CustomInput name="email" type="email" placeholder={t('Email')} />

                                        <CustomSelect name="subject">
                                            <option value=""> {t('Select')} </option>
                                            <option value="Reservations"> {t('Reservations')} </option>
                                            <option value="Questions"> {t('Questions')} </option>
                                            <option value="Hotel booking">{t('HotelBooking')} </option>
                                            <option value="Visa issue">{t('VisaIssue')}</option>
                                            <option value="other">{t('Other')}</option>
                                        </CustomSelect>

                                        <CustomTextArea name="message" placeholder={t('UrMsg')} />

                                        <button className='submit' type="submit"> <img src={paperPlane} alt="" />  {props.isSubmitting ? "Loading..." : t('SendMsg')} </button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </Modal>

            <Modal id='contactModal' isOpen={modalIsOpen1}>
                <img className='closeBtnModal' src={CloseBtn} alt="" onClick={toggleFunction1} />
                <div className='contact__modal'>
                    <div className='searchBar'>
                        <div className="container">
                            <div className='top'>
                                <h3 className='h3Rounded'
                                    onClick={() => handleFilterBlogs('umrah')}
                                    style={active === 'umrah' ? activeStyle : notActiveStyle}>
                                    {t('UMRAH')} </h3>
                                <h3 onClick={() => handleFilterBlogs('voyage')}
                                    style={active === 'voyage' ? activeStyle : notActiveStyle}>
                                    {t('VOYAGE_ORG')} </h3>
                                <h3 className='h3Rounded_'
                                    onClick={() => handleFilterBlogs('visa')}
                                    style={active === 'visa' ? activeStyle : notActiveStyle}>
                                    {t('VISA')} </h3>
                            </div>
                            <form action="">
                                <div className='bottom'>

                                    <div>
                                        <h4>{t('LOCATION')} </h4>
                                        <input type="text" placeholder={t('Enter_your_destinations')} value={location} onChange={e => setLocation(e.target.value)} required />
                                    </div>

                                    <div>
                                        <h4>{t('DATE')} </h4>
                                        <DatePicker defaultValue={null}
                                            value={startDate}
                                            onChange={e => setStartDate(e)}
                                        />
                                    </div>

                                    <div>
                                        <h4>{t('PEOPLE')} </h4>
                                        <input type="text" placeholder={t('how_many_people')} value={groupeSize} onChange={e => setGroupeSize(e.target.value)} />
                                    </div>

                                    <div type='submit' onClick={handleSubmit} className="flip">
                                        <a href='/'>
                                            <div className="front">{t('ExploreNow')} </div>
                                            <div className="back"> {t('ExploreNow')}</div>
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className={`navbar__container ${show && 'navbar__ColorChange'}`} id='web__nav'>

                <div className="logo"><Link to='/'>
                    <img src={ci.logo_dark} style={{ maxWidth: "201px" }} alt="" /> </Link> </div>

                <div className="nav">
                    <div className="nav2"><Link to='/'>{t('home')} </Link></div>

                    <div className="nav1">
                        <li>{t('Services')} </li>
                        <div className='nav1_list' style={{ display: "none" }}>
                            {
                                servicesC.map(s => <Link to={`/services/category/${s.id}`} > {cookies.get('i18next') === 'ar' ? s.name__ar : (cookies.get('i18next') === 'fr' ? s.name__fr : s.name__en)} </Link>)
                            }
                            <Link to='/services/visa'> {t('StudyVisaFiles')}</Link>
                            <Link to='/services/reservation'>{t('Reservation')} </Link>
                        </div>
                    </div>

                    <div className="nav2">
                        <Link to='/offers'> {t('Offers')} </Link>
                    </div>

                    <div className="nav2">
                        <Link to='/units'> {t('Units')} </Link>
                    </div>

                    <div className="nav1">
                        <li className='onMore'> {t('More')} </li>
                        <div className='nav1_list' style={{ display: "none" }}>
                            <Link to='/blogs'>{t('Blog_nav')} </Link>
                            <Link to='/news'>{t('News')} </Link>
                            <Link to='/about-us'> {t('About Us')} </Link>
                        </div>
                    </div>
                </div>

                <div className="cta">

                    <div className="search">
                        <img src={search} onClick={toggleFunction1} alt="" />
                    </div>

                    <div className="lang">
                        <img src={lang} alt="" />
                        <div className="nav2_list" style={{ display: "none" }}>
                            {
                                languages.map((lang) => (
                                    <li key={lang.code}><button className='dropdown-item' onClick={() => i18nex.changeLanguage(lang.code)}> {lang.name} </button> </li>
                                ))
                            }
                        </div>
                    </div>

                    <div className="contact" onClick={toggleFunction}>  <span> {t('Contact')} </span> <img src={plane} alt="" /></div>

                </div>

            </div>

            <div className={`navbar__container ${show && 'navbar__ColorChange'} `} id='web__nav1'>
                <div className='menuBG'>
                    <div>
                        <div>
                            <div onClick={toggleOpen} id="menuImg" className={!openMenu ? 'MenuLineCross' : 'MenuLine'}></div>
                        </div>
                    </div>
                </div>

                <div className="logo"> <Link to='/'>
                    <img src={ci.logo_dark} alt="" style={{ maxWidth: "201px" }} /> </Link> </div>

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

                <div className="nav2" onClick={toggleFunction}>
                    <Link to='#'> {t('Contact')} </Link>
                </div>

                <div className="nav2" onClick={toggleFunction1} >
                    <Link to='#'> Search </Link>
                </div>
            </div>

        </>
    )
}

export default withRouter(Navbar)
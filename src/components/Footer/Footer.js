import React, { useEffect, useState } from 'react'
import IgContent from './IgContent'
import Subscribe from './Subscribe'
import FooterSocialLink from './FooterSocialLink'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import axios from 'axios'
import { SERVICE_C } from '../../sevices/globalServices'
import { Link } from 'react-router-dom'

function Footer() {
    const { t } = useTranslation()

    const [servicesC, setServicesC] = useState([])

    const fetchServicesC = async () => await axios.get(SERVICE_C()).then(data => {
        setServicesC(data.data.data)
    })

    useEffect(() => {
        fetchServicesC()
    }, [])

    return (<> <div className='footer__container'>
        <div className="white" data-aos="fade-down">
            <div className='info'>
                <div className='info_A'>
                    <div>
                        <h2>{t('AnourElSabah')}</h2>
                        <a href="/">{t('home')}</a>
                        {
                            servicesC.map(s => <Link to={`/services/category/${s.id}`} key={s.id} >  {cookies.get('i18next') === 'ar' ? s.name__ar : (cookies.get('i18next') === 'fr' ? s.name__fr : s.name__en)} </Link>)
                        }
                    </div>
                    <div>
                        <h2>{t('Useful')}</h2>
                        <Link to='/offers'>{t('Offers')} </Link>
                        <Link to='/services/visa'> {t('StudyVisaFiles')}</Link>
                        <Link to='/services/reservation'>{t('Reservation')} </Link>
                        <Link to='/units'> {t('Units')}</Link>
                    </div>
                    <div>
                        <h2>
                            {t('More')}
                        </h2>
                        <Link to='/blogs'>{t('Blog_nav')} </Link>
                        <Link to='/news'>{t('News')} </Link>
                        <Link to='/about-us'>{t('About Us')} </Link>
                    </div>
                </div>
                <div className='info_B'>
                    <Subscribe />
                </div>
            </div>

        </div>

    </div> <div className="black" > <FooterSocialLink /> </div>
    </>
    )
}

export default Footer

import React from "react";
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import NavBar from '../Component/NavBar';
import picture from '../image/imgprofile.webp'
import './socmed.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/awandd6', icon: 'bi-facebook', className: 'btn-fb' },
    { name: 'Instagram', url: 'https://instagram.com/adnawaa', icon: 'bi-instagram', className: 'btn-ig' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/awanda', icon: 'bi-linkedin', className: 'btn-ld' },
    { name: 'GitHub', url: 'https://github.com/awand795', icon: 'bi-github', className: 'btn-gh' },
    { name: 'WhatsApp', url: 'https://wa.me/6282362851796', icon: 'bi-whatsapp', className: 'btn-wa' }
];

const Socmed = () => {
    const { t } = useLanguage();
    const { darkTheme, setDarkTheme } = useTheme();
    const currentYear = new Date().getFullYear();

    return(
        <div className={`socmed-page ${darkTheme ? 'dark' : 'light'}`}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="imagewrap content-justify-center position-relative">
                        <div className="bg-animated d-block position-absolute"></div>
                        <img
                            src={picture}
                            className="profilePic mx-auto d-block position-absolute top-50 start-50 translate-middle rounded-3 border-primary"
                            alt="Awanda profile picture"
                            loading="lazy"
                            width="150"
                            height="150"
                        />
                    </div>
                </div>
            </div>

            <div className="row content text-center">
                <div className="col-md-12">
                    <h1 className="fw-bold h1">Awanda</h1>
                    <p className="colorgray fw-bold">{t('social.title')}</p>
                    <a href="https://awanda.eu.org" target="_blank" rel="noopener noreferrer">https://awanda.eu.org</a><br/>
                    <a href="mailto:awand795@gmail.com" className="pt-2">awand795@gmail.com</a>

                    <div className="d-grid gap-4 col-10 col-md-6 pt-4 mx-auto text-start">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                className={`btn ${link.className} text-start`}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${link.name} profile`}
                            >
                                <span className={`bi ${link.icon} icon`}></span>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="col-md-8 mt-4 mx-auto">
                        <p>{t('social.copyright')} {currentYear}</p>
                        <p>{t('social.madeWith')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Socmed;

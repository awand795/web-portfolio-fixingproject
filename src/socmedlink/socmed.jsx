import React from "react";
import imagebghead from '../image/bgimage.gif'
import picture from '../image/imgprofile.jpg'
import './socmed.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/awandd6', icon: 'bi-facebook', className: 'btn-fb' },
    { name: 'Instagram', url: 'https://instagram.com/adnawaa', icon: 'bi-instagram', className: 'btn-ig' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/awanda', icon: 'bi-linkedin', className: 'btn-ld' },
    { name: 'Discord', url: 'https://discord.com/users/adnawaa', icon: 'bi-discord', className: 'btn-dc' },
    { name: 'GitHub', url: 'https://github.com/awand795', icon: 'bi-github', className: 'btn-gh' },
    { name: 'WhatsApp', url: 'https://wa.me/6282362851796', icon: 'bi-whatsapp', className: 'btn-wa' }
];

const Socmed = () => {
    const currentYear = new Date().getFullYear();

    return(
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="imagewrap content-justify-center position-relative">
                    
                        <img src={imagebghead} className="bgimage d-block position-absolute" alt="Background animation" />
                        <img
                            src={picture}
                            className="profilePic mx-auto d-block position-absolute top-50 start-50 translate-middle rounded-3 border-primary"
                            alt="Awanda profile picture"
                        />
                    </div>
                </div>
            </div>

            <div className="row content text-white text-center">
                <div className="col-md-12">
                    <h1 className="fw-bold h1">Awanda</h1>
                    <p className="colorgray fw-bold">Fullstack JavaScript Developer & UI/UX Designer</p>
                    <a href="https://awanda.my.id" target="_blank" rel="noopener noreferrer">https://awanda.my.id</a><br/>
                    <a href="mailto:awand795@gmail.com" className="pt-2">awand795@gmail.com</a>

                    <div className="d-grid gap-4 col-6 pt-4 mx-auto text-start">
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
                        <p>Copyright {currentYear}</p>
                        <p>Made With ❤️ By Awanda</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Socmed;

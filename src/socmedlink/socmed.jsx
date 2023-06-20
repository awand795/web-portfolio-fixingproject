import React from "react";
import imagebghead from '../image/bgimage.gif'
import picture from '../image/awanda.jpg'
import './socmed.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Socmed = () => {
    return(
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="imagewrap content-justify-center position-relative">
                    
                        <img src={imagebghead} className="bgimage d-block position-absolute"></img>
                        <img
                        src={picture}
                        className="profilePic mx-auto d-block position-absolute top-50 start-50 translate-middle rounded-3 border-primary"
                        ></img>
                    </div>
                </div>
            </div>

            <div className="row content text-white text-center">
                <div className="col-md-12">
                        <h1 className="fw-bold h1">Awanda</h1>
                        <p className="colorgray fw-bold">Fullstack Javascript Developer & UI/UX Designer</p>
                        <a href="http://awanda.my.id">http://awanda.my.id</a><br/>
                        <a href="mailto:awand795@gmail.com" className="pt-2">awand795@gmail.com</a>

                        <div className="d-grid gap-4 col-6 pt-4 mx-auto text-start">
                            <a className="btn btn-fb text-start" href="http://facebook.com/awandd6"><span className="bi bi-facebook icon"></span>Facebook</a>
                            <a className="btn btn-ig text-start " href="http://instagram.com/adnawaa"><span className="bi bi-instagram icon"></span>Instagram</a>
                            <a className="btn btn-ld text-start " href="http://linkedin.com/in/awanda"><span className="bi bi-linkedin icon"></span>Linkedin</a>
                            <a className="btn btn-dc text-start " href="http://discord.com/adnawaa"><span className="bi bi-discord icon"></span>Discord</a>
                            <a className="btn btn-gh text-start " href="http://github.com/awand795"><span className="bi bi-github icon"></span>Github</a>
                            <a className="btn btn-wa text-start " href="http://wa.me/+6282362851796"><span className="bi bi-whatsapp icon"></span>Whatsapp</a>
                        </div>

                        <div className="col-md-8 mt-4 mx-auto">
                            <p>Copyright 2023</p>
                            <p>Made With Love By Awanda</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Socmed;
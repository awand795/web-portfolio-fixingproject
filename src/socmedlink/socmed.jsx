import React from "react";
import imagebghead from '../image/bgimage.gif'
import './socmed.css';
import picture from '../image/awanda.jpg'

const Socmed = () => {
    return(
        <div className="socmedlink bg-dark">
            <div className="header">
                <img src={imagebghead} className="bgimage"></img>
                    <img
                        src={picture}
                        className="profilePic"
                        alt="profile pic"
                        width="200"
                        height="200"
                    ></img>
            </div>
        </div>
    )
}

export default Socmed;
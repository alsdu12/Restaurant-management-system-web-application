import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Contact(props) {
  return (
    <>
        <Navbar logout = {props.logout}/>

      <div className="container1">
        <div className="contact-card">
          <h1 className="title1">Where you can find us</h1>

          <p>
            <span>Address: </span>Strada Basarabiei nr 146
          </p>
          <p>
            <span>Telephone: </span>0747533118
          </p>
          <p>
            <span>Mobile: </span> 0753208315
          </p>
          <p>
            <span>Instagram: </span>spicefusion12
          </p>
          <p>
            <span>Facebook: </span>Spice Fusion
          </p>
          <p>
            <span>Program: </span> 12:00-23:00
          </p>

          <div className="iframe">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d588.4982779861808!2d28.038195798034046!3d45.441890150535826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b6de5b117055d3%3A0x53128668fdce630b!2sBulevardul%20Basarabiei%2C%20Gala%C8%9Bi!5e0!3m2!1sro!2sro!4v1684667438594!5m2!1sro!2sro"
              width={400}
              height={350}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        ;
      </div>
    </>
  );
}

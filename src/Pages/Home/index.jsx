/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import './styles.css';

import Header from "../../Components/Header";

import Logo from "./../../assets/logo/logo.png"
import Whatsapp from "./../../assets/whatsapp-brands-yellow.svg"
import House from "./../../assets/house-brands-yellow.svg"
import Instagram from "./../../assets/instagram-brands-yellow.svg"

const Home = () => {

  return (
  <>
    <Header />
    <div className="banner">
      <img id="logo" src={Logo} alt="logo" />
    </div>
    <div className='container'>
      <div className="contact">
        <div>
          <img src={Whatsapp} />
          <span>(51) 9****-****</span>
        </div>
        <div>
          <img src={House} />
          <span>Rua Visconde de Mauá, 1133<br /> Bairo Sander, Três Coroas - RS <br /> 95660-000</span>
        </div>
        <div>
          <img src={Instagram} />
          <span>@xisdozetc</span>
        </div>
      </div>
    </div>
  </>
  )
}

export default Home;
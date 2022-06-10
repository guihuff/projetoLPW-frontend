import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../Services/auth";

import Logo from "./../../assets/logo/logo.png"
import './styles.css'


const Header = ({ auth }) => {
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    isAuthenticated() ? setAuthenticate(true) : setAuthenticate(false) 
  }, [authenticate]);

  return (
    <header>
      <nav className="container">
        <div className="container-header">
          <Link className="image"  to='/'><img src={Logo}></img></Link>
          <ul>
            {authenticate ? <h1>sair</h1> : <h1>entrar</h1>}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;
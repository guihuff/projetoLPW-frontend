/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../../Services/auth";

import Logo from "./../../assets/logo/logo.png"
import Logout from "./../../assets/logout-brands.svg"
import './styles.css'

const Header = () => {
  const [authenticate, setAuthenticate] = useState(false);

  const EntrarNoSite = () => {
    return (
      <>
        <Link className="btn-login" to='/login'>Entrar</Link>
      </>
    )
  }
  
  const SairDoSite = () => {
    return (
      <>
        <li><Link className="nav-link" to=''>Cardapio</Link></li>
        <li><Link className="nav-link" to='/orders'>Pedidos</Link></li>
        <li><Link className="nav-link" to=''>Cadastro</Link></li>
        <li><a className="nav-link" onClick={logout} href="/"><img src={Logout}></img></a></li>
      </>
    )
  }

  useEffect(() => {
    isAuthenticated() ? setAuthenticate(true) : setAuthenticate(false) 
  }, [authenticate]);

  return (
    <header>
      <nav className="container">
        <div className="container-header">
          <Link className="image"  to='/'><img src={Logo}></img></Link>
          <ul>
            {authenticate ? <SairDoSite /> : <EntrarNoSite />}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;
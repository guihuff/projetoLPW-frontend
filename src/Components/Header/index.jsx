/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../../Services/auth";

import Logo from "./../../assets/logo/logo.png"
import Logout from "./../../assets/logout-brands.svg"
import './styles.css'

const Header = () => {
  const [authenticate, setAuthenticate] = useState(false);
  const [submenu, setSubmenu] = useState(false);

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
        <li><Link className="nav-link" to='/menu'>Cardapio</Link></li>
        <li><Link className="nav-link" to='/orders'>Pedidos</Link></li>
        <li>
          <span className="nav-link" onClick={() => setSubmenu(true)}>Cadastrar &#10136;</span>
        </li>
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
          {!submenu ? "" : <>
            <ul className="sub-menu">
              <button className="nav-link" onClick={() => setSubmenu(false)}>X</button>
              <Link className="nav-link" to='/registrar/produto'>Produto</Link>
              <Link className="nav-link" to='/registrar/categoria'>Categoria</Link>
              <Link className="nav-link" to='/registrar/usuario'>Usuário</Link>
            </ul>
          </>}
        </div>
      </nav>
    </header>
  )
}

export default Header;
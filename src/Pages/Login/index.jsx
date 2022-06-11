import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { login } from "../../Services/auth";
import { isAuthenticated } from './../../Services/auth'

import './styles.css'
import Loading from "../../Components/Loading";
import Header from "../../Components/Header";
import Logo from "../../assets/logo/logo.png"

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({email: "", password: ""});
  const [noAuthenticate, setNoAuthenticate] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if( isAuthenticated() ) {
      setLoading(false); 
      navigate("/app"); 
    }
    setLoading(false);
  }, [navigate]);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const {email, password} = data;
    if (!email || !password) {
      setLoading(false);
      setNoAuthenticate("Preencha o e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/authenticate", { email, password });
        response.data.token ? login(response.data.token) : setNoAuthenticate("Acesso negado!"); 
        setLoading(false); 
        navigate("/app");     
      } catch (err) {
        setLoading(false);
        setNoAuthenticate("Acesso negado!");
      }
    }
  }
  if(loading){
    return (
      <>
        <div className="container">
          <div className="container-loading">
            <div class="loading-container">
              <Loading />
            </div>
          </div>
        </div>
      </>
    )
  }
  
  return (
    <>
      <Header />
      <div className="container login">
        <form onSubmit={handleLogin}>
          <img src={Logo} alt="Logo" />
          <input
          type="email"
          placeholder="Endereço de e-mail"
          value={data.email}
          onChange={(e) => {setData({email: e.target.value, password: data.password})}}
          />
          <input
          type="password"
          placeholder="Senha"
          value={data.password}
          onChange={(e) => {setData({email: data.email, password: e.target.value})}}
          />
          <button type="submit">Entrar</button>
        </form>
        {noAuthenticate ? <h3 class="alert">* {noAuthenticate}</h3> : ""}
        {loading ? 
          <div class="loading-container">
            <Loading /> 
          </div>
        : ""}
      </div>
    </>
  )
}

export default Login;
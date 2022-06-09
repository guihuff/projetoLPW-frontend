import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { login } from "../../Services/auth";

import Loading from "../../Components/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({email: "", password: ""});
  const [noAuthenticate, setNoAuthenticate] = useState(undefined);
  const navigate = useNavigate();

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
  
  return (
    <div className="container">
      {noAuthenticate ? <h4>{noAuthenticate}</h4> : ""}
      <form onSubmit={handleLogin}>
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
        {loading ? <Loading /> : ""}
      </form>
    </div>
  )
}

export default Login;
import { useState, useEffect } from "react";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";

import './styles.css';

import Header from '../../Components/Header';
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { Link } from "react-router-dom";

const RegistrationUser = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [active, setActive] = useState(true);

  const [headers, setHeaders] = useState({});

  useEffect(() => {
    setHeaders({ 'authorization': `Bearer ${getToken()}` });
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== ""){
      setLoading(true);
      await api.post('/user',{
        name,
        email,
        password,
        isAdmin,
        active,
      }, headers )
      .then(() => toast.success("Usuário Cadastrado"))
      .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
        console.log(res);
      })

      setName("");
      setEmail("");
      setPassword("");
      setActive(true);
      setIsAdmin(false);
      setLoading(false);
    }
  }

  if ( loading ) {
    return(
      <div className="container">
        <div className="container-loading">
          <div className="loading-container">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container users">
        <div className="box-registration">
          <div className="title">
            <h2>Novo Usuário</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label>Nome:
              <input type='text' required
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              />
            </label>
            <label>Email:
              <input type='email' required
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>Senha:
              <input type='password' required
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="btn" type="submit">Salvar</button>
          </form>
        </div>
        <Link className="link-yellow" to='/atualizar/usuario' >Atualizar ou Excluir um Usuário</Link>
      </div>
    </>
  )
}

export default RegistrationUser;
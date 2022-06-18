import { useState, useEffect } from "react";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";

import './styles.css';
import Trash from "../../assets/trash-can-solid-red.svg";

import Header from '../../Components/Header';
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { Link } from "react-router-dom";

const UpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [active, setActive] = useState("");

  const [headers, setHeaders] = useState({});

  const clear = () => {
    setId("");
    setName("");
    setEmail("");
    setActive("");
    setIsAdmin("");
    setPassword("");
  }

  const loadUsers = () => {
    setLoading(true);
    try{
      async function load() {
        const response = await api.get('/user');
        setUsers(response.data);
      }
      load();
    } catch(err) {
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  }

  const setValues = () => {
    const item = users.find(item => item._id === id);
    setName(item.name);
    setEmail(item.email);
    setActive(item.active);
    setIsAdmin(item.isAdmin);
  }

  useEffect(() => {
    setHeaders({ 'authorization': `Bearer ${getToken()}` });
    try{
      loadUsers();
    } catch {
      toast.error("Ocorreu um erro");
    }
  },[]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (id !== "" && name !== "" && password !== "" && isAdmin !== "" && active !== "" ){
      setLoading(true);
      await api.patch(`/user/${id}`,{
        name,
        email,
        password,
        isAdmin,
        active,
      }, headers )
      .then(() => toast.success("Produto Atualizado"))
      .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
        console.log(res);
      });
      loadUsers();
      clear();
      setLoading(false);
    } else {
      if (id !== "" && name !== "" && isAdmin !== "" && active !== "" ){
        setLoading(true);
        await api.patch(`/user/${id}`,{
          name,
          email,
          isAdmin,
          active,
        }, headers )
        .then(() => toast.success("Produto Atualizado"))
        .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
        console.log(res);
        });
        loadUsers();
        clear();
        setLoading(false);
      }
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if( window.confirm(`Você tem certeza disso? O Usuário ${name} será excluido`)){
      setLoading(true);
      const headers = { 
        'authorization': `Bearer ${getToken()}`,
      };
      try {
        await api.delete(`user/${id}`, headers)
        .then(() => {toast.success(`O Usuário ${name}, foi deletado com sucesso`);})
        .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
      }catch(err){
        console.log(err);
      } finally {
        setLoading(false);
        clear();
        loadUsers();
      }
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
            <h2>Atualizar Usuário</h2>
          </div>
          <form onSubmit={handleUpdate}>
            <label>Usuários:
              <select id='user' value={id} required 
                onChange={e => {
                setId(e.target.value);
                }}
                onBlur={
                () => {
                    id !== "" ? setValues() : console.log(id)
                }
                } 
            >
                <option value=""> Selecione um Usuário </option>
                {users.map((item) => {
                return (
                  <option key={item._id} value={item._id}>{`${item.name} : ${item._id}`}</option>
                )
                })}
                </select>
              </label>
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
              <input type='password'
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="boxSelect">
              <label>É administrador?
                <select id='admin' value={isAdmin} required 
                  onChange={e => {
                  setIsAdmin(e.target.value);
                  }}
                >
                  <option value=""> O usuário é administrador? </option>
                  <option value={true}> Sim </option>
                  <option value={false}> Não </option>
                </select>
              </label>
              <label>Está Ativo?
                <select id='ativo' value={active} required 
                  onChange={e => {
                  setActive(e.target.value);
                  }}
                >
                  <option value=""> O usuário está Ativo? </option>
                  <option value={true}> Sim </option>
                  <option value={false}> Não </option>
                </select>
              </label>
            </div>
            <div className="containerBtn">
              <button className="btn" type="submit">Salvar</button>
              <button className="btn" type="submit" onClick={handleDelete}><img src={Trash} alt="deletar" /></button>
            </div>
          </form>
        </div>
        <Link className="link-yellow" to='/registrar/usuario' >Novo Usuário</Link>
      </div>
    </>
  )
}

export default UpdateUser;
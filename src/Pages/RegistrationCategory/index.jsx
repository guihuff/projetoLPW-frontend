import { useState, useEffect } from "react";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";

import './styles.css';

import Header from '../../Components/Header';
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { Link } from "react-router-dom";

const RegistrationCategory = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [headers, setHeaders] = useState({});

  useEffect(() => {
    setHeaders({ 'authorization': `Bearer ${getToken()}` });
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "" && imageURL !== ""){
      setLoading(true);
      await api.post('/category',{
        name: name,
        description: description,
        imageURL: imageURL,
      }, headers )
      .then(() => toast.success("Categoria Cadastrada"))
      .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
        console.log(res);
      })

      setName("");
      setDescription("");
      setImageURL("");
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
      <div className="container category">
        <div className="box-registration">
          <div className="title">
            <h2>Nova Categoria</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label>Nome:
              <input type='text' required
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              />
            </label>
            <label>Descrição:
              <input type='text' required
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>URL da Imagem:
              <input type='text' required
              value={imageURL} 
              onChange={(e) => setImageURL(e.target.value)}
              />
            </label>
            <button className="btn" type="submit">Salvar</button>
          </form>
        </div>
        <Link className="link-yellow" to='/atualizar/categoria' >Atualizar ou Excluir uma Categoria</Link>
      </div>
    </>
  )
}

export default RegistrationCategory;
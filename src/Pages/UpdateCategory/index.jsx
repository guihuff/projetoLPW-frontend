import { useState, useEffect } from "react";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";

import './styles.css';
import Trash from "../../assets/trash-can-solid-red.svg";

import Header from '../../Components/Header';
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { Link } from "react-router-dom";

const UpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categorys, setCategorys] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [headers, setHeaders] = useState({});

  const clear = () => {
    setId("");
    setName("");
    setDescription("");
    setImageURL("");
  }

  const loadCategory = () => {
    setLoading(true);
    try{
      async function load() {
        const response = await api.get('/category');
        setCategorys(response.data);
      }
      load();
    } catch(err) {
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  }

  const setValues = () => {
    const item = categorys.find(item => item._id === id);
    setName(item.name);
    setDescription(item.description);
    setImageURL(item.imageURL);
  }

  useEffect(() => {
    setHeaders({ 'authorization': `Bearer ${getToken()}` });
    try{
      loadCategory();
    } catch {
      toast.error("Ocorreu um erro");
    }
  },[]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (id !== "" && name !== "" && description !== "" && imageURL !== "" ){
      setLoading(true);
      await api.patch(`/category/${id}`,{
        name: name,
        description: description,
        imageURL: imageURL
      }, headers )
      .then(() => toast.success("Produto Atualizado"))
      .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
        console.log(res);
      })
      loadCategory();
      clear();
      setLoading(false);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    toast.info("Não é possivel deletar categorias ainda, pode haver produtos com essa categoria.", {
      position: "top-center",
      autoClose: 5000,
    });
    return
    // if( window.confirm(`Você tem certeza disso? O produto ${name} será excluido`)){
    //   setLoading(true);
    //   const headers = { 
    //     'authorization': `Bearer ${getToken()}`,
    //   };
    //   try {
    //     await api.delete(`category/${id}`, headers)
    //     .then(() => {toast.success(`O produto ${name}, foi deletado com sucesso`);})
    //     .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
    //   }catch(err){
    //     console.log(err);
    //   } finally {
    //     setLoading(false);
    //     clear();
    //     loadCategory();
    //   }
    // }
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
            <h2>Atualizar Categoria</h2>
          </div>
          <form onSubmit={handleUpdate}>
            <label>Category:
                <select id='categoria' value={id} required 
                    onChange={e => {
                    setId(e.target.value);
                    }}
                    onBlur={
                    () => {
                        id !== "" ? setValues() : console.log(id)
                    }
                    } 
                >
                    <option value=""> Selecione uma Categoria </option>
                    {categorys.map((item) => {
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
            <div className="containerBtn">
              <button className="btn" type="submit">Salvar</button>
              <button className="btn" type="submit" onClick={handleDelete}><img src={Trash} alt="deletar" /></button>
            </div>
          </form>
        </div>
        <Link className="link-yellow" to='/registrar/categoria' >Nova Categoria</Link>
      </div>
    </>
  )
}

export default UpdateCategory;
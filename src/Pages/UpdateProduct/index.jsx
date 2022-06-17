import { useState, useEffect } from "react";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";

import './styles.css';
import Trash from "../../assets/trash-can-solid-red.svg";

import Header from '../../Components/Header';
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { Link } from "react-router-dom";

const UpdateProduct = () => {
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [categoryValue, setCategoryValue] = useState("");

  const [headers, setHeaders] = useState({});

  const clear = () => {
    setId("");
    setName("");
    setDescription("");
    setCategoryValue("");
    setValue(0);
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

  const loadProducts = () => {
    setLoading(true);
    try{
      async function load() {
        const response = await api.get('/product');
        setProducts(response.data);
      }
      load();
    } catch(err) {
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  }

  const setValues = () => {
    const item = products.find(item => item._id === id);
    setName(item.name);
    setDescription(item.description);
    setCategoryValue(item.category);
    setValue(item.value);
  }

  useEffect(() => {
    setHeaders({ 'authorization': `Bearer ${getToken()}` });
    try{
      loadCategory();
      loadProducts();
    } catch {
      toast.error("Ocorreu um erro");
    }
  },[]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "" && categoryValue !== "" && value !== 0 ){
      setLoading(true);
      await api.patch(`/product/${id}`,{
        name: name,
        description: description,
        category: categoryValue,
        value: value
      }, headers )
      .then(() => toast.success("Produto Atualizado"))
      .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
        console.log(res);
      })
      loadProducts();
      clear();
      setLoading(false);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    toast.info("Não é possivel deletar o produto ainda, pode haver pedidos com esse produto.", {
      position: "top-center",
      autoClose: 5000,
    });
    // if( window.confirm(`Você tem certeza disso? O produto ${name} será excluido`)){
    //   setLoading(true);
    //   const headers = { 
    //     'authorization': `Bearer ${getToken()}`,
    //   };
    //   try {
    //     await api.delete(`product/${id}`, headers)
    //     .then(() => {toast.success(`O produto ${name}, foi deletado com sucesso`);})
    //     .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
    //   }catch(err){
    //     console.log(err);
    //   } finally {
    //     setLoading(false);
    //     clear();
    //     loadProducts();
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
      <div className="container product">
        <div className="box-registration">
          <div className="title">
            <h2>Atualizar Produto</h2>
          </div>
          <form onSubmit={handleUpdate}>
            <label>Produto:
              <select id='produto' value={id} required 
                onChange={e => {
                  setId(e.target.value);
                  }}
                onBlur={
                  () => {
                    id !== "" ? setValues() : console.log(id)
                  }
                } 
              >
                <option value=""> Selecione um produto </option>
                {products.map((item) => {
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
            <label>Categoria:
              <select id='categoria' value={categoryValue} required onChange={e => setCategoryValue(e.target.value)}>
                <option value=""> Selecione a Categoria </option>
                {categorys.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  )
                })}
              </select>
            </label>
            <label>Valor:
              <input type='number' step="0.010" min={0} required
              value={value} 
              onChange={(e) => setValue(e.target.value)}
              />
            </label>
            <div className="containerBtn">
              <button className="btn" type="submit">Salvar</button>
              <button className="btn" type="submit" onClick={handleDelete}><img src={Trash} alt="deletar" /></button>
            </div>
          </form>
        </div>
        <Link className="link-yellow" to='/registrar/produto' >Novo produto</Link>
      </div>
    </>
  )
}

export default UpdateProduct;
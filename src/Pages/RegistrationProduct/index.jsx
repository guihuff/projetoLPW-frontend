import { useState, useEffect } from "react";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";

import './styles.css';

import Header from '../../Components/Header';
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";

const RegistrationProduct = () => {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [categoryValue, setCategoryValue] = useState("");

  const [headers, setHeaders] = useState({});

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

  useEffect(() => {
    setHeaders({ 'authorization': `Bearer ${getToken()}` });
    try{
      loadCategory();
    } catch {
      toast.error("Ocorreu um erro");
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "" && categoryValue !== "" && value !== 0 ){
      setLoading(true);
      await api.post('/product',{
        name: name,
        description: description,
        category: categoryValue,
        value: value
      }, headers )
      .then(() => toast.success("Produto Cadastrado"))
      .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
        console.log(res);
      })

      setName("");
      setDescription("");
      setCategoryValue("");
      setValue(0);
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
      <div className="container product">
        <div className="box-registration">
          <div className="title">
            <h2>Novo Produto</h2>
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
            <button className="btn" type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegistrationProduct;
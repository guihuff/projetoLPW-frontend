import React,{ useState, useEffect} from "react";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import Eye from "../../assets/eye-regular.svg";
import Plus from "../../assets/plus-circle-solid.svg";
import Minus from "../../assets/minus-circle-solid.svg";

import Loading from "../../Components/Loading";
import Header from "../../Components/Header";
import { toast } from "react-toastify";

const RegistrationOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listProducts, setListProducts] = useState(undefined);
  const [productsSelect, setProductsSelect] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  
  
  const [table, setTable] = useState("");
  const [client, setClient] = useState("");

  const [categorys, setCategorys] = useState([]);

  const [headers, setHeaders] = useState({});

  useEffect(() => {
    setHeaders({ 'authorization': `Bearer ${getToken()}` });
  },[]);

  const loadCategorys = () => {
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

  const handleGetProducts = (id) => {
    try{
      async function load() {
        const response = await api.get(`/productCategory/${id}`);
        setListProducts(response.data);
      }
      load();
    } catch(err) {
      toast.error("Ocorreu um erro");
    }
  }

  useEffect(() => {
    loadCategorys();
  }, []);

  const handleAddProduct = (item) => {
    let list = [];
    list = [...productsSelect, { id: (productsSelect.length+1), item }];
    setSubTotal(subTotal+item.value);
    setProductsSelect(list);
  }

  const handleRemoveProduct = (id) => {
    let list = productsSelect.filter((item) => item.id !== id);
    let sub = productsSelect.filter((item) => item.id === id)[0].item.value;
    setProductsSelect(list);
    setSubTotal(subTotal-sub);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let itens = [];
    for(let i in productsSelect){
      itens.push(productsSelect[i].item._id);
    }
    
    if (table !== "" && itens.length !== 0){
      setLoading(true);
      await api.post('/order',{
        table,
        itens,
        client,
      }, headers )
      .then(() => toast.success("Pedido Cadastrado"))
      .catch((res) => {
        toast.error("Erro ao cadastrar, tente acessar novamente sua conta!");
      });
      setLoading(false);
      navigate("/pedido"); 
    } else {
      toast.info("Selecione algum produto")
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
      <div className="container newOrder">
        <div className="box-registration">
          <div className="title">
            <h2>Novo Pedido</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lineOne">
              <label>Mesa:
                <input id="tableNumber" type='number' min={0} required
                value={table} 
                onChange={(e) => setTable(e.target.value)} 
                />
              </label>
              <label>Cliente:
                <input type='text'
                value={client} 
                onChange={(e) => setClient(e.target.value)} 
                />
              </label>
            </div>
            <div className="boxCetegorys">
              {categorys.map(object => {
                return (
                  <div key={object._id} onClick={() => handleGetProducts(object._id)} >
                    <h3>{object.name}</h3>
                    <img src={Eye} alt="arrow"/>
                  </div>
                )
              })}
            </div>
            <div className="listItems">
              {listProducts === undefined ? <h3>Selecione uma Categoria</h3> : (
                <ul>
                {listProducts.map((item) => {
                  return (
                    <li key={item._id}>
                      <div>
                        <h4>{item.name} | R$: {item.value.toFixed(2)}</h4>
                        <p>{item.description}</p>
                      </div>
                      <img src={Plus} alt="adicionar" onClick={() => handleAddProduct(item)}/>
                    </li>
                  )
                })}
                </ul>)}
            </div>
            <div className="listOrder">
              <h3>Produtos Selecionados</h3>
              <ul>
                
                {productsSelect.map((item) => {
                  return (
                    <li key={item.id}>
                      <div>
                        <h4>{item.item.name} | R$: {item.item.value.toFixed(2)}</h4>
                      </div>
                      <img src={Minus} alt="remover" onClick={() => handleRemoveProduct(item.id)}/>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="finish">
              <div className="total">
                <h4>Total:</h4>
                <span>R$ {subTotal.toFixed(2)}</span>
              </div>
              <button className="btn" type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegistrationOrder;
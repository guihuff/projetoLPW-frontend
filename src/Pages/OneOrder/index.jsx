/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { getToken } from "../../Services/auth";
import { toast } from "react-toastify";

import "./styles.css";
import Check from "../../assets/circle-check-solid.svg";
import Confirm from "../../assets/verification-status-confirm.svg";
import Stay from "../../assets/verification-status-stay.svg";
import Trash from "../../assets/trash-can-solid-red.svg";

import Header from "../../Components/Header";
import Loading from "../../Components/Loading";

const OneOrder = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState({});
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const total = itens.reduce((total, item)=>{
    return total + item.value;
  }, 0);

  useEffect(() => {
    try {
      async function loadPedido () {
        const response = await api.get(`orderAll/${id}`);
        // console.log(response.data)
        setPedido(response.data);
        setItens(response.data.itensObject);
      }
      loadPedido();
    } catch(err) {
      console.log("Algo deu errado");
    }finally{
      setLoading(false);
    }
  }, [id]);

  const handleDelete = async () => {
    if( window.confirm(`Você tem certeza disso? Não será possivel restalrar o pedido da mesa ${pedido.table}`)){
      setLoading(true);
      const headers = { 
        'authorization': `Bearer ${getToken()}`,
      };
      try {
        await api.delete(`order/${id}`, headers)
        .then(() => {toast.success(`Pedido Mesa ${pedido.table}, deletado com sucesso`); navigate("/orders");})
        .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
      }catch(err){
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  const handleAceitar = async () => {
    setLoading(true);
    const headers = { 
      'authorization': `Bearer ${getToken()}`,
    };
    try {
      await api.patch(`order/${id}`, {confirmation: true} , headers)
      .then(() => {
        toast.success(`O Pedido Mesa ${pedido.table}, foi aceito e está esperando a confirmação da cozinha`);
        let order = pedido;
        order.confirmation = true;
        setPedido(order);
      })
      .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
    }catch(err){
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const handleComecar = async () => {
    setLoading(true);
    const headers = { 
      'authorization': `Bearer ${getToken()}`,
    };
    try {
      await api.patch(`order/${id}`, {inProgess: true} , headers)
      .then(() => {
        toast.success(`O Pedido Mesa ${pedido.table}, Começou a ser produzido`);
        let order = pedido;
        order.inProgess = true;
        setPedido(order);
      })
      .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
    }catch(err){
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const handleEntregar = async () => {
    setLoading(true);
    const headers = { 
      'authorization': `Bearer ${getToken()}`,
    };
    try {
      await api.patch(`order/${id}`, {isFinish: true} , headers)
      .then(() => {
        toast.success(`O Pedido Mesa ${pedido.table}, Foi entregue`);
        let order = pedido;
        order.isFinish = true;
        setPedido(order);
      })
      .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
    }catch(err){
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const handleFinish = async () => {
    setLoading(true);
    const headers = { 
      'authorization': `Bearer ${getToken()}`,
    };
    try {
      await api.patch(`order/${id}`, {isPaid: true} , headers)
      .then(() => {
        toast.success(`O Pedido Mesa ${pedido.table}, Foi fechado`);
        navigate("/pedido");
      })
      .catch((res) => toast.error(`Algo deu errado, tente entrar novamente`));
    }catch(err){
      console.log(err);
    } finally {
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
      <div className="container order-details">
        {pedido === undefined ? <strong>Algo deu errado!</strong> : null }
        <div className="title">
          <h1>Pedido</h1>
          <img src={Trash} alt="deletar" onClick={handleDelete}/>
        </div>
        <div className="box-order">
          <h2>Detalhes do pedido</h2>
          <div className="cabecalho"> 
            <h3>Mesa {pedido.table}</h3>
            {pedido.client !== undefined ? <h4>{pedido.client}</h4> : ""}
          </div>
          <div className="product-cabecalho">
            <span>Item</span><span>valor</span>
          </div>
          <div className="product-container">
            {itens.map((iten) => {
              return (
                <article key={Math.random()}>
                  <ul>
                    <li><span>{iten.name}</span><span>{iten.value.toFixed(2)}</span></li>
                  </ul>
                </article>
              )
            })}
          </div>
          <div className="total">
            <h4>Total:</h4>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="status-box">
            <div className="status">
              <div>
                <span>Confirmação</span>
                <span>Produção</span>
                <span>Entregue</span>
              </div>
              <div className="status-order">
                <img src={pedido.confirmation ? Confirm : Stay} />
                <img src={pedido.inProgess ? Confirm : Stay} />
                <img src={pedido.isFinish ? Confirm : Stay} />
              </div>
            </div>
            <div className="status-button"> 
              {
                !pedido.confirmation ? (
                  <><span>Aceitar</span><button className="btn" onClick={handleAceitar}><img src={Check} /></button></>
                ) : !pedido.inProgess ? (
                  <><span>Começar</span><button className="btn" onClick={handleComecar}><img src={Check} /></button></>
                ) : pedido.inProgess && !pedido.isFinish ? (
                  <><span>Entregar</span><button className="btn" onClick={handleEntregar}><img src={Check} /></button></>
                ) : !pedido.isPaid ? (
                  <><span>Fechar</span><button className="btn" onClick={handleFinish}><img src={Check} /></button></>
                ) : "Pedido já foi finalizado"
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default OneOrder;
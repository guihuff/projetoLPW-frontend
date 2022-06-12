/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/api";

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

  const total = itens.reduce((total, item)=>{
    return total + item.value;
  }, 0);


  useEffect(() => {
    try {
      async function loadPedido () {
        const response = await api.get(`orderAll/${id}`);
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
          <img src={Trash} alt="deletar" />
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
                    <li><span>{iten.name}</span><span>{iten.value}</span></li>
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
                <img src={pedido.isProgress ? Confirm : Stay} />
                <img src={pedido.isFinish ? Confirm : Stay} />
              </div>
            </div>
            <div className="status-button"> 
              {
                !pedido.confirmation ? (
                  <><span>Aceitar</span><button><img src={Check} /></button></>
                ) : !pedido.inProgess ? (
                  <><span>Começar</span><button><img src={Check} /></button></>
                ) : pedido.inProgess && !pedido.isFinish ? (
                  <><span>Entregar</span><button><img src={Check} /></button></>
                ) : !pedido.isPaid ? (
                  <><span>Fechar</span><button><img src={Check} /></button></>
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
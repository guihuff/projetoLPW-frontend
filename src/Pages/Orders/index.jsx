/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect } from "react";
import api from "../../Services/api";

import "./styles.css";

import Loading from "../../Components/Loading";
import Header from "../../Components/Header";

import Rotate from "../../assets/rotate-brands-gray.svg"
import Confirm from "../../assets/verification-status-confirm.svg"
import Stay from "../../assets/verification-status-stay.svg"
import { Link } from "react-router-dom";

const Orders = () => {
  const [pedidosOpen, setPedidosOpen] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    try{
      async function loadPedidos() {
        const response = await api.get('/order');
        let day = [];
        for (let i in response.data) {
          if (response.data[i].isPaid === false) {
            day.push(response.data[i])
          }
        }
        setPedidosOpen(day);
      }
      loadPedidos();
    } catch(err) {
      setPedidosOpen("Erro ao retornar os pedidos, verifique se você está logado!");
    }
    setLoading(false);
  }

  useEffect(() => {
    try{
      loadOrders();
    } catch {
      setPedidosOpen("Erro ao retornar os pedidos, verifique se você está logado!");
    }
  },[]);

  const handlePedidos = () => {
    try{
      loadOrders();
    }catch (err){
      setPedidosOpen("Erro ao retornar os pedidos, verifique se você está logado!");
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
      <div className="container orders">
        <div className="title">
          <div>
            <h1>Pedidos</h1>
            <img src={Rotate} alt="recaregar" onClick={handlePedidos}/>
          </div>
          <Link className="btn" to="/registrar/pedido" alt="Novo" >+ Novo</Link>
        </div>
        <div className="header-table">
          <div>
            <h2>Mesa</h2>
          </div>
          <div>
            <span>Confirmação</span>
            <span>Produção</span>
            <span>Entregue</span>
          </div>
        </div>
        {pedidosOpen.map((pedido) => {
          return(
            <article key={pedido._id} className="line-table">
              <Link to={`/pedido/${pedido._id}`}>
                <span>Mesa {pedido.table}</span>
                <div className="status-order">
                  <img src={pedido.confirmation ? Confirm : Stay} />
                  <img src={pedido.inProgess ? Confirm : Stay} />
                  <img src={pedido.isFinish ? Confirm : Stay} />
                </div>
              </Link>
            </article>
        )})}
      </div>
    </>
  )
}
export default Orders;
import React, {useState, useEffect } from "react";
import api from "../../Services/api";

import "./styles.css";

import Loading from "../../Components/Loading";
import Header from "../../Components/Header";

import Rotate from "../../assets/rotate-brands-gray.svg"
import Confirm from "../../assets/verification-status-confirm.svg"
import Stay from "../../assets/verification-status-stay.svg"

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try{
      async function loadPedidos() {
        const response = await api.get('/order');
        console.log(response.data);

        setPedidos(response.data);
        
        setLoading(false);
      }

      loadPedidos();
    }catch (err){
      console.log(err);
    }
  },[]);
  const handlePedidos = () => {
    try{
      async function loadPedidos() {
        const response = await api.get('/order');
        console.log(response.data);

        setPedidos(response.data);
        
        setLoading(false);
      }

      loadPedidos();
    }catch (err){
      console.log(err);
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
          <h1>Pedidos</h1>
          <img src={Rotate} alt="recaregar" onClick={handlePedidos}/>
        </div>
        <div className="header-table">
          <div>
            <h2>Mesa</h2>
          </div>
          <div>
            <span>Confirmação</span>
            <span>Produção</span>
            <span>Pagamento</span>
          </div>
        </div>
        {pedidos.map((pedido) => {
          return(
            <article key={pedido._id} className="line-table">
              <span>Mesa {pedido.table}</span>
              <div className="status-order">
                <img src={pedido.confirmation ? Confirm : Stay} />
                <img src={pedido.isProgress ? Confirm : Stay} />
                <img src={pedido.isFinish ? Confirm : Stay} />
              </div>
            </article>
        )})}
      </div>
    </>
  )
}
export default Orders;
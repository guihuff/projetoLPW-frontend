import React, { useEffect, useState } from "react";
import api from "../../Services/api";

import './styles.css';
import Loading from "../../Components/Loading";
// URL DA API: /movie/now_playing?api_key=ab689815313a6cb4fd9a5df7af38599f&language=pt-BR

const Home = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try{
      async function loadPedidos() {
        const response = await api.get('/order');
        // console.log(response.data);

        setPedidos(response.data);
        
        setLoading(false);
      }

      loadPedidos();
    }catch (err){
      console.log(err);
    }

  },[]);

  if ( loading ) {
    return(
      <div className="loading">
        <Loading />
      </div>
    );
  }

  return (
    <div className='container'>
      <div className="lista-filmes">
        {pedidos.map((pedido) => {
          return (
            <article key={pedido._id}>
              <strong>{pedido.table}</strong>
              {pedido.itens.map((item) => {
                return (
                  <article key={item}>
                    <strong>{item}</strong>
                  </article>
                );
                })}
            </article>
          );
        })}
      </div>
    </div>
  )
}

export default Home;
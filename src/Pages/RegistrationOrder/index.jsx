import React,{ useState, useEffect} from "react";

import "./styles.css";

import Loading from "../../Components/Loading";
import Header from "../../Components/Header";

const RegistrationOrder = () => {
  const [loading, setLoading] = useState(true);
  
  const [table, setTable] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = () => {}

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
                <input id="tableNumber" type='text' required
                value={table} 
                onChange={(e) => setTable(e.target.value)} 
                />
              </label>
              <label>Cliente:
                <input type='text'
                value={table} 
                onChange={(e) => setTable(e.target.value)} 
                />
              </label>
            </div>
            <div className="boxItens">

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegistrationOrder;
import { useState } from "react";

import './styles.css';

import Header from '../../Components/Header';

const RegistrationProduct = () => {
  return (
    <>
      <Header />
      <div className="container product">
        <div className="box-registration">
          <div className="title">
            <h2>Novo Produto</h2>
          </div>
          <form>
            <label>Nome:
              <input type='text'></input>
            </label>
            <label>Descrição:
              <input type='text'></input>
            </label>
            <label>Categoria:
              <input type='text'></input>
            </label>
            <label>Valor:
              <input type='text'></input>
            </label>
            <button className="btn">Salvar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegistrationProduct;
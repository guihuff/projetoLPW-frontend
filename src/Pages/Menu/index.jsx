import React, {useState, useEffect } from "react";
import api from "../../Services/api";

import "./styles.css";
import '@splidejs/react-splide/css';

import Loading from "../../Components/Loading";
import Header from "../../Components/Header";
import { toast } from "react-toastify";
import { Splide, SplideSlide } from '@splidejs/react-splide';


const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [categorys, setCategorys] = useState([]);
  const [listProduct, setListProduct] = useState(undefined);
  const [loadItens, setLoadItens] = useState(false);

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
    try{
      loadCategory();
    } catch(err) {
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGetProducts = (id) => {
    setLoadItens(true);
    try{
      async function load() {
        const response = await api.get(`/productCategory/${id}`);
        setListProduct(response.data);
      }
      load();
    } catch(err) {
      toast.error("Ocorreu um erro");
    } finally {
      setLoadItens(false);
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
      <div className="container menu">
        <Splide aria-label="My Categorys"
          options={{
            type: 'slide',
            rewind: true,
            perMove: 4,
            gap: 6,
            autoWidth: true,
            width: 1200,
            pagination: false,
            paginationDirection: 'ttb',
            classes: {
              arrows: 'splide__arrows your-class-arrows',
              prev  : 'splide__arrow--prev your-class-prev',
		          next  : 'splide__arrow--next your-class-next',
            },
            breakpoints: {
              1000: {
                perMove: 3,
              },
              900: {
                perMove: 2,
              },
              700: {
                perMove: 1,
              }
            }
          }}
        >
          {categorys.map((item) => {
            return (
              <SplideSlide key={item._id}>
                <div className="card" onClick={() => handleGetProducts(item._id)}>
                  <img src={item.imageURL} alt={item.name}/>
                  <h4>{item.name}</h4>
                </div>
              </SplideSlide>
          )})}
        </Splide>
        <div className="margin"></div>
        <div className="boxItens">
          {loadItens ? (
            <div className="loading-container">
              <Loading />
            </div> ) : (
              <div className="listItems">
                {listProduct === undefined ? <h3>Selecione uma Categoria</h3> : (
                  <ul>
                    {listProduct.map((item) => {
                      return (
                        <li key={item._id}>
                          <div>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                          </div>
                          <h4>Valor: R$ {item.value.toFixed(2)}</h4>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}
        </div>

      </div>
    </>
  )
}

export default Menu;
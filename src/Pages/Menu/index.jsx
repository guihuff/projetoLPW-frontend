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
  console.log(categorys)
  return (
    <>
      <Header />
      <div className="container menu">
        <Splide aria-label="My Categorys"
          options={{
            type: 'slide',
            rewind: true,
            perMove: 1,
            gap: 6,
            autoWidth: true,
            width: 1200,
            pagination: false,
            paginationDirection: 'ttb',
            classes: {
              arrows: 'splide__arrows your-class-arrows',
              prev  : 'splide__arrow--prev your-class-prev',
		          next  : 'splide__arrow--next your-class-next',
            }
          }}
        >
          {categorys.map((item) => {
            return (
              <SplideSlide key={item._id}>
                <div className="card">
                  <img src={item.imageURL} alt={item.name}/>
                  <h4>{item.name}</h4>
                </div>
              </SplideSlide>
          )})}
        </Splide>
        <div className="margin">
          
        </div>
      </div>
    </>
  )
}

export default Menu;
import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";

const index = () => {
  const [nutri, setNutri] = useState([]);
  useEffect(() => {
    function loadApi() {
      let url = "https://sujeitoprogramador.com/rn-api/?api=posts";
      fetch(url)
        .then((r) => r.json())
        .then((json) => {
          console.log(json);
          setNutri(json);
        });
    }

    loadApi();
  }, []);

  return (
    <div className="container">
      <header>
        <strong>React Nutri</strong>
      </header>

      {nutri.map((currentItem) => {
        return (
          <article key={currentItem.id} className="post">
            <strong className="titulo">{currentItem.titulo}</strong>
            <img
              src={currentItem.capa}
              alt={currentItem.titulo}
              className="capa"
            />
            <p className="subtitulo">{currentItem.subtitulo}</p>

            <h1>Categoria {currentItem.categoria}</h1>

            <a className="botao" href="">
              Acessar
            </a>
          </article>
        );
      })}
    </div>
  );
};

export default index;

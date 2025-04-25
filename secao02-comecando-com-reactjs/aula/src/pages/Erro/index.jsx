import { Link } from "react-router-dom";
import React from "react";

const Erro = () => {
  return (
    <div>
      <h1>Hum, parece que essa pagina nao existe!</h1>

      <span>Você pode estar procurando</span>
      <br />
      <Link to="/">Home</Link>
      <br />
      <Link to="/contato">Contato</Link>
      <br />
      <Link to="/sobre">Sobre</Link>
      <br />
    </div>
  );
};

export default Erro;

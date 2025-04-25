import React from "react";
import { Link } from "react-router-dom";

const Contato = () => {
  return (
    <div>
      <h1>Seja bem vindo a Contato!</h1>
      <br />
      <span>Email: teste@teste.com</span>
      <Link to="/">Home</Link>
      <br />
      <Link to="/sobre">Sobre nós</Link>
    </div>
  );
};

export default Contato;

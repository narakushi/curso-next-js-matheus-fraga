import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>Header</div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/sobre">Sobre</Link>
      <br />
      <Link to="/contato">Contato</Link>
      <br />
    </div>
  );
};

export default Header;

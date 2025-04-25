import { Link } from "react-router-dom";

const Sobre = () => {
  return (
    <div>
      <h1>Bem vindo a pagina Sobre Nós</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/contato">Contato</Link>
    </div>
  );
};

export default Sobre;

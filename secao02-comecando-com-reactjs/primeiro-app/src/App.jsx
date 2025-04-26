import ListaTarefas from "./components/ListaTarefas";
//import "./App.css";
import {BemVindo, Container, Head} from "./styles";

function App() {
  return (
    //<ListaTarefas />;
    <Container>
      <Head>
        <a href="">Projeto Styled</a>
      </Head>

      <BemVindo cor="00ff00" tamanho={15}>Bem vindo ao sistema!</BemVindo>

    </Container>
  );
}

export default App;


/**
 *   <div className="container">
      <header className="header">
        <a className="titulo" href="">
          Projeto Styled
        </a>
      </header>

      <h1>Bem vindo ao sistema!</h1>
    </div>
 */
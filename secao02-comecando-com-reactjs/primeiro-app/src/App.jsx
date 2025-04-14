import Nome from "./components/Nome";
import { use, useState } from "react";

function App() {
  const [aluno, setAluno] = useState('Sujeito Programador');

  function handleChangeName(nome){
    setAluno(nome);
  }

  return (
    <div>
      <h1>Componente App</h1>
      <h2>Olá: {aluno}</h2>
      <button onClick={() => handleChangeName('Lucas Oliveira')}>
        Mudar nome
      </button>


    </div>
  );
}


export default App;

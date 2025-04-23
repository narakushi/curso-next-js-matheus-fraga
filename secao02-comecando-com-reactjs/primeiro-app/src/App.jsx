import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState([
    'Pagar a conta de  luz',
    'estudar react js'
  ]);

  function handleRegister(e) {
    e.preventDefault()

    setTarefas([...tarefas, input])
    setInput('');
  }

  return (
    <div>
      <h1>Cadastrando usuário</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="">Nome da tarefa:</label>
        <br />
        <input
          placeholder="Digite uma tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />

        <button type="submit">Registrar</button>
        
        <br />
        <br />

        <ul>
          {tarefas.map(tarefa => (
            <li key={tarefa}>{tarefa}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;

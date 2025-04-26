import React from "react";
import { useState, useEffect } from "react";

const ListaTarefas = () => {
  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState([
    "estudar javascript",
    "estudar mongodb",
  ]);

  // component did mount
  useEffect(() => {
    const tarefasStorage = localStorage.getItem("@tarefa");

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, []);

  //update
  useEffect(() => {
    localStorage.setItem("@tarefa", JSON.stringify(tarefas));
  }, [tarefas]);

  function handleRegister(e) {
    e.preventDefault();

    setTarefas([...tarefas, input]);
    setInput("");
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
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa}>{tarefa}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default ListaTarefas;

import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import "./styles";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  //DidMount buscar

  useEffect(() => {
    const reposStorage = localStorage.getItem('repos');

    if(reposStorage) {
      setRepositorios(JSON.parse(reposStorage));
    }
  }, [])


  //DidUpdate salvar alterações

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios])

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
    setAlert(null);
  };

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter((r) => r.name != repo);
    setRepositorios(find);

  }, [repositorios])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const submit = async () => {
        setAlert(null);
        setLoading(true);
        try {

          if(newRepo == ''){
            throw new Error('Você precisa indicar um repositório');
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorios.find(repo => repo.name === newRepo);

          if(hasRepo){
            throw new Error('Repositório Duplicado!');
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          setAlert("true");
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      submit();
    },
    [newRepo, repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} err={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

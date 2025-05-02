import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton } from "./styles";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

export default function Repositorio() {
  const { repositorio } = useParams();

  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const nomeRepo = repositorio;

      // para não fazer duas chamadas de api com const nome = awat...
      // podemos usar um Promise.all

      const [respositoriosData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepo(respositoriosData.data);

      console.log(repo);

      setIssues(issuesData.data);
      console.log(issuesData);
      setLoading(false);
    };

    load();
  }, [repositorio]);

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#0d2636" size={30} />
      </BackButton>
      <Owner>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>
    </Container>
  );
}

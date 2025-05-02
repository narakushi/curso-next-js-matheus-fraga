import { useParams } from "react-router-dom";
import { Container } from "./styles";
import { useState, useEffect } from "react";
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
      setIssues(issuesData.data);
      setLoading(false);
    };

    load();
  }, [repositorio]);

  return <Container>{repositorio}</Container>;
}

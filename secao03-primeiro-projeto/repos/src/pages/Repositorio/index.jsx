import { useParams } from "react-router-dom";
import {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageActions,
  StateButton,
} from "./styles";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

export default function Repositorio() {
  const { repositorio } = useParams();

  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [stateBtns, setStateBtns] = useState([
    { title: "Aberta", state: "open", active: true },
    { title: "Fechada", state: "closed", active: false },
    { title: "Todas", state: "all", active: false },
  ]);

  const [btnIndex, setBtnIndex] = useState(0);

  const handleChangeIndex = (index) => {
    setBtnIndex(index);
  };

  useEffect(() => {
    const load = async () => {
      const nomeRepo = repositorio;

      // para não fazer duas chamadas de api com const nome = awat...
      // podemos usar um Promise.all

      const [respositoriosData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: stateBtns.find((btn) => btn.active).state,
            per_page: 5,
          },
        }),
      ]);

      setRepo(respositoriosData.data);

      setIssues(issuesData.data);
      setLoading(false);
    };

    load();
  }, [repositorio, stateBtns]);

  useEffect(() => {
    const nomeRepo = repositorio;

    const loadingIssue = async () => {
      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: stateBtns[btnIndex].state,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    };

    loadingIssue();
    console.log(`/repos/${repositorio}/issues`);
  }, [stateBtns, btnIndex, page]);

  const handlePage = (action) => {
    setPage(action === "back" ? page - 1 : page + 1);
  };

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

      <StateButton active={btnIndex}>
        {stateBtns.map((btn, index) => (
          <button key={btn.title} onClick={() => handleChangeIndex(index)}>
            {btn.title}
          </button>
        ))}
      </StateButton>

      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => handlePage("back")}
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => {
            handlePage("next");
          }}
        >
          Proxima
        </button>
      </PageActions>
    </Container>
  );
}

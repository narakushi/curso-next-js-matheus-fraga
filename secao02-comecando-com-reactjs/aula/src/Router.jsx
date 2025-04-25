import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Sobre from "./pages/Sobre";
import Header from "./components/Header";
import Erro from "./pages/Erro";
import Produto from "./pages/Produto";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/produto/:id" element={<Produto />}></Route>

        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

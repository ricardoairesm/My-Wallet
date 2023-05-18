import Login from "./Pages/login";
import "./Assets/CSS/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./Pages/cadastro";
import Home from "./Pages/home";
import Context from "./Pages/Context";
import NovaEntrada from "./Pages/nova-entrada";
import NovaSaida from "./Pages/nova-saida";
import { useState } from "react";


function App() {
  const [info, setInfo] = useState({
    user:{
      nome: "",
      email: ""
    },
    token: "",
  });
  return (
    <>
      <Context.Provider value={[info, setInfo]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/nova-entrada" element={<NovaEntrada />} />
            <Route path="/nova-saida" element={<NovaSaida />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>

    </>
  );
}

export default App;
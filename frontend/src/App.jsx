import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Páginas
import Pomodoro from "./pages/Pomodoro";
import PomodoroTimer from "./components/PomodoroTimer";
import ConfigConta from "./pages/ConfigConta";
import GerenciarTarefas from "./pages/GerenciarTarefas";
import Kanban from "./pages/Kanban";
import Produtividade from "./pages/Produtividade";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rota principal / e dashboard */}
        <Route path="/" element={<Pomodoro />} />
        <Route path="/dashboard" element={<PomodoroTimer />} /> {/* ← aqui */}
        
        {/* Outras páginas */}
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/configuracoes" element={<ConfigConta />} />
        <Route path="/gerenciar-tarefas" element={<GerenciarTarefas />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/produtividade" element={<Produtividade />} />
      </Routes>
    </Layout>
  );
}

export default App;

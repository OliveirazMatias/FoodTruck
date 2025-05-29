import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cardapio from "./pages/TelasClientes/Cardapio";
import Carrinho from "./pages/TelasClientes/Carrinho";
import Quemsomos from "./pages/TelasClientes/QuemSomos";
import Login from "./pages/TelasColaboradores/Login";
import Comandas from "./pages/TelasColaboradores/Comandas";
import Estoque from "./pages/TelasColaboradores/Estoque";
import HistoricoPedidos from "./pages/TelasColaboradores/HistoricoPedidos";
import InicialColaboradores from "./pages/TelasColaboradores/InicialColaboradores";
import AddLanche from "./pages/TelasSuperAdm/AddLanche";
import AddFuncionario from "./pages/TelasSuperAdm/AddFuncionario";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import imglogo from "./assets/logo/logo.png";
import imgPerfil from "./assets/icons/iconperfil.png";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/quemsomos" element={<Quemsomos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/estoque"
          element={
            <ProtectedRoute allowedRoles={["Administrador", "Funcionario"]}>
              <Estoque />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historicopedidos"
          element={
            <ProtectedRoute allowedRoles={["Administrador", "Funcionario"]}>
              <HistoricoPedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comandas"
          element={
            <ProtectedRoute allowedRoles={["Administrador", "Funcionario"]}>
              <Comandas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/colaboradoresinicial"
          element={
            <ProtectedRoute allowedRoles={["Administrador", "Funcionario"]}>
              <InicialColaboradores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addlanche"
          element={
            <ProtectedRoute allowedRoles={["Administrador"]}>
              <AddLanche />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addfuncionario"
          element={
            <ProtectedRoute allowedRoles={["Administrador"]}>
              <AddFuncionario />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
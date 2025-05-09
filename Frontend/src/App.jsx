import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cardapio from './pages/TelasClientes/Cardapio';
import Carrinho from './pages/TelasClientes/Carrinho';
import Quemsomos from'./pages/TelasClientes/QuemSomos';
import Login from './pages/TelasColaboradores/Login';
import Comandas from './pages/TelasColaboradores/Comandas';
import Mesas from './pages/TelasColaboradores/Mesas';
import './App.css';
import Estoque from './pages/TelasColaboradores/Estoque';
import HistoricoPedidos from './pages/TelasColaboradores/HistoricoPedidos';
import InicialColaboradores from './pages/TelasColaboradores/InicialColaboradores';
import AddLanche from './pages/TelasSuperAdm/AddLanche';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Cardapio />} />
          <Route path="/quemsomos" element={<Quemsomos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/historicopedidos" element={<HistoricoPedidos/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/comandas" element={<Comandas />}/>
          <Route path="/mesas" element={<Mesas />}/>
          <Route path="/colaboradoresinicial" element={<InicialColaboradores />}/>
          <Route path="/addlanche" element={<AddLanche />}/>
        </Routes>
    </Router>
  );
}

export default App;



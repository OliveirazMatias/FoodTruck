import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cardapio from './pages/TelasClientes/Cardapio';
import Carrinho from './pages/TelasClientes/Carrinho';
import Quemsomos from'./pages/TelasClientes/QuemSomos';
import Login from './pages/TelasColaboradores/Login';
import Comandas from './pages/TelasColaboradores/Comandas';
import Mesas from './pages/TelasColaboradores/Mesas';

import './App.css';
import imglogo from './assets/logo/logo.png';
import imgPerfil from './assets/icons/iconperfil.png' 
import Estoque from './pages/TelasColaboradores/Estoque';
import HistoricoPedidos from './pages/TelasColaboradores/HistoricoPedidos';

function App() {
  return (
    <Router>
        <header className="header">
          <p></p>
          <nav>
            <img className="logo" src={imglogo} alt="logo" />
            <Link to="/" className="nav-link-header">CARDÁPIO</Link>
            <Link to="/quemsomos" className="nav-link-header">QUEM SOMOS</Link>
            <Link to="/carrinho" className="nav-link-header">CARRINHO</Link>
          </nav>
          <img src={imgPerfil} alt="" className='perfil' />
        </header>

        <Routes>
          <Route path="/" element={<Cardapio />} />
          <Route path="/quemsomos" element={<Quemsomos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/historicopedidos" element={<HistoricoPedidos/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/comandas" element={<Comandas />}/>
          <Route path="/mesas" element={<Mesas />}/>
          <Route path="/estoque" element={<Estoque />}/>
        </Routes>
    </Router>
  );
}

export default App;



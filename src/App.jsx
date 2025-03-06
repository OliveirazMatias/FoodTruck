import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cardapio from './pages/TelasClientes/Cardapio';
import Carrinho from './pages/TelasClientes/Carrinho';
import Quemsomos from './pages/TelasClientes/QuemSomos';
import Login from './pages/TelasColaboradores/Login';
import Comandas from './pages/TelasColaboradores/Comandas';
import Mesas from './pages/TelasColaboradores/Mesas';
import './App.css';
import imglogo from './assets/logo/logo.png';

function App() {
  return (
    <Router>
        <header className="header">
          <nav>
            <img className="logo" src={imglogo} alt="logo" />
            <Link to="/" className="nav-link">CARDÁPIO</Link>
            <Link to="/quemsomos" className="nav-link">QUEM SOMOS</Link>
            <Link to="/carrinho" className="nav-link">CARRINHO</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Cardapio />} />
          <Route path="/quemsomos" element={<Quemsomos />} />
          <Route path="/carrinho" element={<Carrinho />} />

          <Route path="/login" element={<Login />} />
          <Route path="/comandas" element={<Comandas />}/>
          <Route path="/mesas" element={<Mesas />}/>
        </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cardapio from './pages/TelasClientes/Cardapio';
import Carrinho from './pages/TelasClientes/Carrinho';
import Quemsomos from './pages/TelasClientes/QuemSomos';
import Login from './pages/TelasColaboradores/Login';
import Comandas from './pages/TelasColaboradores/Comandas';
import './App.css';
import imglogo from './assets/logo/logo.png';
import imgPerfil from './assets/icons/iconperfil.png' // Importa o ícone de perfil
import Estoque from './pages/TelasColaboradores/Estoque';


function App() {
  return (
    <Router>
      <header className="header">
        <nav className="nav-container">
          <img className="logo" src={imglogo} alt="logo" />
          
          <div className="nav-links">
            <Link to="/" className="nav-link">CARDÁPIO</Link>
            <Link to="/quemsomos" className="nav-link">QUEM SOMOS</Link>
            <Link to="/carrinho" className="nav-link">CARRINHO</Link>
          </div>

          {/* Ícone de perfil no canto direito */}
          <Link to="/login" className="profile-icon">
            <img src={imgPerfil} alt="Perfil" className="perfil-img" />
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/quemsomos" element={<Quemsomos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comandas" element={<Comandas />} />
        <Route path="/estoque" element={<Estoque />} />


      </Routes>
    </Router>
  );
}

export default App;



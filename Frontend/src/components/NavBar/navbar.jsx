import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './navbar.css';
import imglogo from '../../assets/logo/logo.png';
import imgPerfil from '../../assets/icons/iconperfil.png';

function Navbar() {
  return ( // Adicionar o return para retornar o JSX
    <header className="header">
      <nav>
        <img className="logo" src={imglogo} alt="logo" />
        <Link to="/" className="nav-link-header">CARDÁPIO</Link>
        <Link to="/quemsomos" className="nav-link-header">QUEM SOMOS</Link>
        <Link to="/carrinho" className="nav-link-header">CARRINHO</Link>
      </nav>
      <img src={imgPerfil} alt="Perfil" className="perfil" />
    </header>
  );
}

export default Navbar;
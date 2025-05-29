import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './navbar.css';
import imglogo from '../../assets/logo/logo.png';
import imgPerfil from '../../assets/icons/iconperfil.png';

function Navbar() {
  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={imglogo} alt="logo" />
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link-header">CARDÁPIO</Link>
        <Link to="/quemsomos" className="nav-link-header">QUEM SOMOS</Link>
        <Link to="/carrinho" className="nav-link-header">CARRINHO</Link>
      </div>
      <Link to="/login">
        <img src={imgPerfil} alt="Perfil" className="perfil" />
      </Link>
    </header>
  );
}

export default Navbar;

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../NavBar/navbar.css';
import imglogo from '../../assets/logo/logo.png';
import imgPerfil from '../../assets/icons/iconperfil.png';

function Navbar() {
  return (
    <header className="header">
      <nav>
        <img className="logo" src={imglogo} alt="logo" />
      </nav>
      <div className="nav-links">
            <Link to="/colaboradoresInicial" className="nav-link-header">TELA INICIAL</Link>
            <Link to="/comandas" className="nav-link-header">COMANDAS</Link>
            <Link to="/historicopedidos" className="nav-link-header">HISTORICO DE PEDIDOS</Link>
            <Link to="/estoque" className="nav-link-header">ESTOQUE</Link>
        </div>
      <Link to="/login">
        <img src={imgPerfil} alt="Perfil" className="perfil" />
      </Link>
    </header>
  );
}

export default Navbar;
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
            <Link to="/addlanche" className="nav-link-header">GERENCIAMENTO DE LANCHES</Link>
            <Link to="/addfuncionario" className="nav-link-header">GERENCIAMENTO DE FUNCIONARIOS</Link>
        </div>
      <Link to="/login">
        <img src={imgPerfil} alt="Perfil" className="perfil" />
      </Link>
    </header>
  );
}

export default Navbar;
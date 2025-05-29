import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import imglogo from '../../assets/logo/logo.png';
import imgPerfil from '../../assets/icons/iconperfil.png';

function Navbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se o usuário está logado
  const tipoFuncionario = localStorage.getItem('tipo_funcionario'); // Obtém o tipo de funcionário
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Define isLoggedIn como true se o token existir
  }, []); // Executa apenas uma vez ao carregar o componente

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo_funcionario');
    localStorage.removeItem('nome');
    setShowLogoutModal(false);
    setIsLoggedIn(false); // Atualiza o estado para refletir o logout
    navigate('/login'); // Redireciona para a página de login
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowLogoutModal(true); // Exibe o modal se o usuário estiver logado
    } else {
      navigate('/login'); // Redireciona para a página de login se não estiver logado
    }
  };

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

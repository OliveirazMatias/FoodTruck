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
      <Link to="/">
        <img className="logo" src={imglogo} alt="logo" />
      </Link>
      <div className="nav-links">
        {tipoFuncionario === 'Administrador' && (
          <>
            <Link to="/addlanche" className="nav-link-header">GERENCIAMENTO DE LANCHES</Link>
            <Link to="/addfuncionario" className="nav-link-header">GERENCIAMENTO DE FUNCIONÁRIOS</Link>
          </>
        )}
        {tipoFuncionario === 'Funcionario' && (
          <>
            <Link to="/colaboradoresInicial" className="nav-link-header">TELA INICIAL</Link>
            <Link to="/comandas" className="nav-link-header">COMANDAS</Link>
            <Link to="/historicopedidos" className="nav-link-header">HISTÓRICO DE PEDIDOS</Link>
            <Link to="/estoque" className="nav-link-header">ESTOQUE</Link>
          </>
        )}
        {!tipoFuncionario && (
          <>
            <Link to="/" className="nav-link-header">CARDÁPIO</Link>
            <Link to="/quemsomos" className="nav-link-header">QUEM SOMOS</Link>
            <Link to="/carrinho" className="nav-link-header">CARRINHO</Link>
          </>
        )}
      </div>
      <img
        src={imgPerfil}
        alt="Perfil"
        className="perfil"
        onClick={handleProfileClick} // Verifica se exibe o modal ou redireciona
      />
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h2>Deseja sair?</h2>
            <button className="btn-confirm-logout" onClick={handleLogout}>
              Sim
            </button>
            <button
              className="btn-cancel-logout"
              onClick={() => setShowLogoutModal(false)}
            >
              Não
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
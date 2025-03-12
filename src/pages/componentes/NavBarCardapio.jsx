import React, { useState } from 'react';
import './NavBarCardapio.css';
// import imgxsalada from '../../assets/cardapio/x-salada.jpg';
import imgxsalada from "../../assets/cardapio/x-salada.jpg";

const NavBarCardapio = () => {
  const [activeTab, setActiveTab] = useState('hamburguer');

  const renderContent = () => {
    switch (activeTab) {
      case 'hamburguer':
        return (
          <div className='hamburguer-content'>
            <div className='lanche'>
              <div className='lanchefuncionapf'>
                <div className='imagem-lanche'>
                  <a className='lanche-imagem' href="">
                    <img src={imgxsalada} alt="x-salada" />
                  </a>
                </div>
                <div className='lanche-descricao'>
                  <span className='nome-lanche'>X-Salada</span>
                  <span className='descricao-lanche'>Hambúrguer, queijo, tomate, alface, picles e maionese.</span>
                  <span className='preco-lanche'>R$25,00</span>
                </div>
              </div>
            </div>
            <div className='lanche'>
              <div className='lanchefuncionapf'>
                <div className='imagem-lanche'>
                  <a className='lanche-imagem' href="">
                    <img src={imgxsalada} alt="x-salada" />
                  </a>
                </div>
                <div className='lanche-descricao'>
                  <span className='nome-lanche'>X-Salada</span>
                  <span className='descricao-lanche'>Hambúrguer, queijo, tomate, alface, picles e maionese.</span>
                  <span className='preco-lanche'>R$25,00</span>
                </div>
              </div>
            </div>
            <div className='lanche'>
              <div className='lanchefuncionapf'>
                <div className='imagem-lanche'>
                  <a className='lanche-imagem' href="">
                    <img src={imgxsalada} alt="x-salada" />
                  </a>
                </div>
                <div className='lanche-descricao'>
                  <span className='nome-lanche'>X-Salada</span>
                  <span className='descricao-lanche'>Hambúrguer, queijo, tomate, alface, picles e maionese.</span>
                  <span className='preco-lanche'>R$25,00</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'porcoes':
        return <div>Porções Content</div>;
      case 'hotdog':
        return <div>Hotdog Content</div>;
      case 'pasteis':
        return <div>Pasteis Content</div>;
      case 'bebida':
        return <div>Bebidas Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="button-group">
        <button className={`button ${activeTab === 'hamburguer' ? 'active' : ''}`} onClick={() => setActiveTab('hamburguer')}>Hamburguer</button>
        <button className={`button ${activeTab === 'porcoes' ? 'active' : ''}`} onClick={() => setActiveTab('porcoes')}>Porções</button>
        <button className={`button ${activeTab === 'hotdog' ? 'active' : ''}`} onClick={() => setActiveTab('hotdog')}>Hotdog</button>
        <button className={`button ${activeTab === 'pasteis' ? 'active' : ''}`} onClick={() => setActiveTab('pasteis')}>Pasteis</button>
        <button className={`button ${activeTab === 'bebida' ? 'active' : ''}`} onClick={() => setActiveTab('bebida')}>Bebida</button>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default NavBarCardapio;
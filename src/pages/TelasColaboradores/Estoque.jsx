import React, { useState } from "react";
import '../TelasColaboradoresCss/Estoque.css';

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="estoque-container">
      <h1 className="estoque-titulo">
        GERENCIAMENTO DE <span>ESTOQUE</span>
      </h1>

      <p className="textobusque">BUSQUE INGREDIENTES :</p>

      <div className="barra-pesquisa">
        <span className="pesquisa-icon"></span>
        <input 
          type="text" 
          placeholder="Digite um ingrediente..."    
          className="search-input"
          value={searchTerm}   
          onChange={(e) => setSearchTerm(e.target.value)}  
        />
      </div>

      {searchTerm.toLowerCase() === "tomate" && (
        <div className="card">
          <h2 className="card-tittle">TOMATE</h2>
          <div className="card-info">
            <span>QUANTIDADE: 2 CAIXAS DISPONÍVEIS</span>
            <span>VALIDADE: 12/04/25</span>
          </div>
          <button className="edit-botao">Editar</button>
        </div>
      )}
    </div>
  );
};

export default Estoque;

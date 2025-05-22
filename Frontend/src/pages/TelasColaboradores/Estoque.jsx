import React, { useState } from "react"; 
import '../TelasColaboradoresCss/Estoque.css';
import Navbar from '../../components/NavBar/navbar.jsx';


const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const ingredientes = {
    tomate: { quantidade: "2 CAIXAS DISPONÍVEIS", validade: "12/04/25" },
    pao: { quantidade: "5 PACOTES DISPONÍVEIS", validade: "20/04/25" },
    frango: { quantidade: "3 KG DISPONÍVEIS", validade: "15/04/25" }
  };

  const openModal = (ingredient = null) => {
    setSelectedIngredient(ingredient);
    setIsAdding(ingredient === null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedIngredient(null);
    setIsAdding(false);
  };

  return (
    <div className="estoque-container">
      <Navbar/>
      <h1 className="estoque-titulo">
        GERENCIAMENTO DE <span>ESTOQUE</span>
      </h1>

      <p className="textobusque">BUSQUE INGREDIENTES :</p>

      <div className="pesquisa">
        <input
          type="text"
          placeholder="Digite um ingrediente:" 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <button className="adicionar" onClick={() => openModal()}> <span>+</span> </button>
      </div>

      {Object.keys(ingredientes).map((key) => (
        searchTerm && key.includes(searchTerm) ? (
          <div key={key} className="card-container">
            <h2 className="card-tittle">{key.toUpperCase()}</h2>
            <div className="card-info">
              <span>QUANTIDADE: {ingredientes[key].quantidade} </span>
              <span>VALIDADE: {ingredientes[key].validade}</span>
            </div>
            <div className="botoesE"> 
              <button className="botaoeditar" onClick={() => openModal(key)}>Editar</button>
              <button className="botaoexcluir">Excluir</button>
            </div>
          </div>
        ) : null
      ))}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="titulo-add-ingrediente">{isAdding ? "Adicionar Novo Ingrediente" : `Editar ${selectedIngredient?.toUpperCase()}`}</h2>
            <label className="label-nome" >Nome:</label>
            <input className="input-add-ingredientes" type="text" defaultValue={isAdding ? "" : selectedIngredient} disabled={!isAdding} />
            <label className="label-quantidade" >Quantidade:</label>
            <input className="input-add-ingredientes" type="text" defaultValue={isAdding ? "" : ingredientes[selectedIngredient]?.quantidade} />
            <label className="label-validade" >Validade:</label>
            <input className="input-add-ingredientes" type="text" defaultValue={isAdding ? "" : ingredientes[selectedIngredient]?.validade} />
            <div className="modal-buttons">
              <button className="button-salvar" onClick={closeModal}>Salvar</button>
              <button className="button-cancelar" onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estoque;
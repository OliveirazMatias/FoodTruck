import React, { useState, useEffect, useRef } from "react";
import '../TelasColaboradoresCss/Estoque.css';
import Navbar from '../../components/NavBar/navbar.jsx';
import { getEstoque, postEstoque, updateEstoque, deleteEstoque } from "../../Services/api";

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [validade, setValidade] = useState("");
  const [estoque, setEstoque] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchEstoque = async () => {
      try {
        const response = await getEstoque();
        setEstoque(response.itens || []);
      } catch (error) {
        console.error("Erro ao buscar itens do estoque:", error);
      }
    };
    fetchEstoque();
  }, []);

  const openModal = (ingredient = null) => {
    setSelectedIngredient(ingredient);
    setIsAdding(ingredient === null);
    setNome(ingredient ? ingredient.nome : "");
    setQuantidade(ingredient ? ingredient.quantidade : "");
    setValidade(ingredient ? ingredient.data_entrada : "");
    setModalOpen(true);

    setTimeout(() => {
      modalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedIngredient(null);
    setIsAdding(false);
    setNome("");
    setQuantidade("");
    setValidade("");
  };

  const handleValidadeChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
    if (value.length > 8) value = value.slice(0, 8); // Limita a 8 dígitos
    if (value.length >= 5) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4);
    } else if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setValidade(value);
  };

  const handleQuantidadeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setQuantidade(value);
    } else if (e.target.value === "") {
      setQuantidade("");
    }
  };

  const formatDateForBackend = (date) => {
    const [day, month, year] = date.split("/");
    if (day && month && year) {
      const formattedDate = new Date(`${year}-${month}-${day}`);
      if (!isNaN(formattedDate)) {
        return formattedDate.toISOString().split("T")[0]; // Formato esperado pelo MySQL (YYYY-MM-DD)
      }
    }
    return null; // Retorna null se a data estiver inválida
  };

  const handleSave = async () => {
    try {
      const formattedDate = formatDateForBackend(validade);
      if (!formattedDate) {
        alert("Por favor, insira uma data válida no formato DD/MM/AAAA.");
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      if (formattedDate < today) {
        alert("A data de validade não pode estar no passado.");
        return;
      }

      if (quantidade <= 0) {
        alert("A quantidade deve ser maior que 0.");
        return;
      }

      if (isAdding) {
        await postEstoque({ nome, quantidade, data_entrada: formattedDate, disponibilidade: "disponível" });
        alert("Ingrediente adicionado com sucesso!");
      } else {
        await updateEstoque({ id: selectedIngredient.id, nome, quantidade, data_entrada: formattedDate, disponibilidade: "disponível" });
        alert("Ingrediente atualizado com sucesso!");
      }
      const response = await getEstoque();
      setEstoque(response.itens || []);
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar ingrediente:", error);
      alert("Erro ao salvar ingrediente. Tente novamente.");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Tem certeza que deseja excluir este ingrediente?")) {
        await deleteEstoque(id);
        alert("Ingrediente excluído com sucesso!");
        const response = await getEstoque();
        setEstoque(response.itens || []);
      }
    } catch (error) {
      console.error("Erro ao excluir ingrediente:", error);
      alert("Erro ao excluir ingrediente. Tente novamente.");
    }
  };

  return (
    <div className="estoque-container">
      <Navbar />
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

      {estoque
        .filter((item) => item.nome.toLowerCase().includes(searchTerm))
        .map((item) => (
          <div key={item.id} className="card-container">
            <h2 className="card-tittle">{item.nome.toUpperCase()}</h2>
            <div className="card-info">
              <span>QUANTIDADE: {item.quantidade}</span>
              <span>VALIDADE: {item.data_entrada}</span>
            </div>
            <div className="botoesE">
              <button className="botaoeditar" onClick={() => openModal(item)}>Editar</button>
              <button className="botaoexcluir" onClick={() => handleDelete(item.id)}>Excluir</button>
            </div>
          </div>
        ))}

      {modalOpen && (
        <div ref={modalRef} className="modal-overlay">
          <div className="modal-container">
            <h2 className="titulo-add-ingrediente">{isAdding ? "Adicionar Novo Ingrediente" : `Editar ${selectedIngredient?.nome.toUpperCase()}`}</h2>
            <label className="label-nome">Nome:</label>
            <input
              className="input-add-ingredientes"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={!isAdding}
              maxLength={50} // Limita o nome a 50 caracteres
            />
            <label className="label-quantidade">Quantidade:</label> 
            <input
              className="input-add-ingredientes"
              type="number"
              step={1}
              value={quantidade}
              onChange={handleQuantidadeChange}
              min={0} // Garante que o valor mínimo seja 0
            />
            <label className="label-validade">Validade:</label>
            <input
              className="input-add-ingredientes"
              type="text"
              value={validade}
              onChange={handleValidadeChange}
              maxLength={10}
            />
            <div className="modal-buttons">
              <button className="button-salvar" onClick={handleSave}>Salvar</button>
              <button className="button-cancelar" onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estoque;


import React, { useState, useEffect } from "react";
import {
  postLanches,
  getLanches,
  updateLanches,
  deleteLanches,
} from "../../Services/api.js";
import "../TelasSuperAdmCss/AddLanche.css";
import Navbar from "../../components/NavBarSuperAdm/navbar.jsx";

function AddLanche() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    disponibilidade: "disponível",
    imagem: "",
    tipo: "hamburguer",
  });

  const [mensagem, setMensagem] = useState("");
  const [lanches, setLanches] = useState([]);
  const [editando, setEditando] = useState(null);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(null);

  useEffect(() => {
    const fetchLanches = async () => {
      try {
        const response = await getLanches();
        setLanches(response);
      } catch (error) {
        console.error("Erro ao buscar lanches:", error);
      }
    };

    fetchLanches();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "preco") {
      const formattedValue = value
        .replace(/[^0-9,]/g, "")
        .replace(/(,.*?),/g, "$1");
      setFormData({ ...formData, [id]: formattedValue });
    } else if (id === "nome" && value.length <= 50) {
      setFormData({ ...formData, [id]: value }); // Limite de 50 caracteres para nome
    } else if (id === "descricao" && value.length <= 100) {
      setFormData({ ...formData, [id]: value }); // Limite de 100 caracteres para descrição
    } else if (id === "imagem" && value.length <= 255) {
      setFormData({ ...formData, [id]: value }); // Limite de 255 caracteres para URL da imagem
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleBlur = () => {
    if (formData.preco) {
      const precoFormatado = parseFloat(formData.preco.replace(",", "."))
        .toFixed(2)
        .replace(".", ",");
      setFormData({ ...formData, preco: precoFormatado });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataComPonto = {
      ...formData,
      preco: formData.preco.replace(",", "."),
    };

    try {
      const response = await postLanches(formDataComPonto);
      setMensagem("Lanche adicionado com sucesso!");
      console.log("Resposta da API:", response);
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        disponibilidade: "disponível",
        imagem: "",
        tipo: "hamburguer",
      });
      const updatedLanches = await getLanches();
      setLanches(updatedLanches);
    } catch (error) {
      console.error("Erro ao adicionar lanche:", error);
      setMensagem("Erro ao adicionar lanche. Tente novamente.");
    }
  };

  const handleEdit = (lanche) => {
    if (editando && editando.id === lanche.id) {
      // Se o mesmo lanche for clicado novamente, cancelar a edição
      setEditando(null);
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        disponibilidade: "disponível",
        imagem: "",
        tipo: "hamburguer",
      });
    } else {
      setEditando(lanche);
      setFormData({
        nome: lanche.nome,
        descricao: lanche.descricao,
        preco: lanche.preco.replace(".", ","),
        disponibilidade: lanche.disponibilidade,
        imagem: lanche.imagem,
        tipo: lanche.tipo,
      });
    }
  };

  const handleUpdate = async () => {
    const formDataComPonto = {
      ...formData,
      preco: formData.preco.replace(",", "."),
      nome_original: editando.nome,
    };

    try {
      const response = await updateLanches(formDataComPonto);
      setMensagem("Lanche atualizado com sucesso!");
      console.log("Resposta da API:", response);
      setEditando(null); // Finaliza a edição
      const updatedLanches = await getLanches();
      setLanches(updatedLanches);
    } catch (error) {
      console.error("Erro ao atualizar lanche:", error);
      setMensagem("Erro ao atualizar lanche. Tente novamente.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLanches(id);
      setMensagem("Lanche deletado com sucesso!");
      const updatedLanches = await getLanches();
      setLanches(updatedLanches);
      setConfirmandoExclusao(null);
    } catch (error) {
      console.error("Erro ao deletar lanche:", error);
      setMensagem("Erro ao deletar lanche. Tente novamente.");
    }
  };

  return (
    <div className="add-lanche-container">
      <Navbar />
      <h1 className="add-lanche-titulo">
        GERENCIAMENTO DE <span>LANCHES</span>
      </h1>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <div className="grid-container">
        <div className="lanches-list">
          <h2 className="lanches-titulo">Lanches Cadastrados</h2>
          <table className="lanches-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Disponibilidade</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lanches.map((lanche) => (
                <tr key={lanche.id}>
                  <td>{lanche.nome}</td>
                  <td>{lanche.descricao}</td>
                  <td>
                    R$ {parseFloat(lanche.preco).toFixed(2).replace(".", ",")}
                  </td>
                  <td>{lanche.disponibilidade}</td>
                  <td>{lanche.tipo}</td>
                  <td>
                    <button
                      className="btn-edit-lanche"
                      onClick={() => handleEdit(lanche)}
                    >
                      {editando && editando.id === lanche.id
                        ? "Cancelar"
                        : "Editar"}
                    </button>
                    <button
                      className="btn-delete-lanche"
                      onClick={() => setConfirmandoExclusao(lanche.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form
          onSubmit={editando ? handleUpdate : handleSubmit}
          className="add-lanche-form"
        >
          {editando && (
            <div className="form-group">
              <label htmlFor="nomeOriginal" className="form-label">
                Nome Original do Lanche
              </label>
              <input
                type="text"
                className="form-input"
                id="nomeOriginal"
                value={editando.nome}
                disabled
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="nome" className="form-label">
              Nome do Lanche
            </label>
            <input
              type="text"
              className="form-input"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao" className="form-label">
              Descrição
            </label>
            <input
              type="text"
              className="form-input"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="preco" className="form-label">
              Preço
            </label>
            <input
              type="text"
              className="form-input"
              id="preco"
              value={formData.preco}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={10} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="disponibilidade" className="form-label">
              Disponibilidade
            </label>
            <select
              className="form-input"
              id="disponibilidade"
              value={formData.disponibilidade}
              onChange={handleChange}
              required
            >
              <option value="disponível">Disponível</option>
              <option value="indisponível">Indisponível</option>
              <option value="temporariamente fora de estoque">
                Temporariamente Fora de Estoque
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imagem" className="form-label">
              URL da Imagem
            </label>
            <input
              type="text"
              className="form-input"
              id="imagem"
              value={formData.imagem}
              onChange={handleChange}
              required
              maxLength={255}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo" className="form-label">
              Tipo
            </label>
            <select
              className="form-input"
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="hamburguer">Hambúrguer</option>
              <option value="pastel">Pastel</option>
              <option value="hotdog">Hot Dog</option>
              <option value="porcao">Porção</option>
              <option value="bebida">Bebida</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          <button type="submit" className="btn-add-lanche">
            {editando ? "Salvar Alterações" : "Adicionar"}
          </button>
        </form>
      </div>
      {confirmandoExclusao && (
        <div className="popup-modal">
          <div className="popup-content">
            <h2>Tem certeza que deseja excluir este lanche?</h2>
            <button
              onClick={() => handleDelete(confirmandoExclusao)}
              className="btn-confirm-delete"
            >
              Sim
            </button>
            <button
              onClick={() => setConfirmandoExclusao(null)}
              className="btn-cancel-delete"
            >
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddLanche;

import React, { useState, useEffect } from "react";
import { postCadastro, getUsuario, deleteLogin, updateUsuario } from "../../Services/api.js";
import "../TelasSuperAdmCss/AddFuncionario.css";
import Navbar from "../../components/NavBarSuperAdm/navbar.jsx";

function AddFuncionario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo_funcionario: "Funcionario",
  });

  const [mensagem, setMensagem] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(null);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await getUsuario();
        setFuncionarios(response);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postCadastro(formData);
      setMensagem("Funcionário adicionado com sucesso!");
      setFormData({ nome: "", email: "", senha: "", tipo_funcionario: "Funcionario" });
      const updatedFuncionarios = await getUsuario();
      setFuncionarios(updatedFuncionarios);
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      setMensagem("Erro ao adicionar funcionário. Tente novamente.");
    }
  };

  const handleEdit = (funcionario) => {
    if (editando && editando.id === funcionario.id) {
      setEditando(null);
      setFormData({
        nome: "",
        email: "",
        senha: "",
        tipo_funcionario: "Funcionario",
      });
    } else {
      setEditando(funcionario);
      setFormData({
        nome: funcionario.nome,
        email: funcionario.email,
        senha: "",
        tipo_funcionario: funcionario.tipo_funcionario,
      });
    }
  };

  const handleUpdate = async () => {
    const formDataComNomeOriginal = {
      ...formData,
      nome_original: editando.nome, // Envia o nome original para o backend
    };

    try {
      const response = await updateUsuario(formDataComNomeOriginal);
      setMensagem("Funcionário atualizado com sucesso!");
      setEditando(null);
      const updatedFuncionarios = await getUsuario();
      setFuncionarios(updatedFuncionarios);
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      setMensagem("Erro ao atualizar funcionário. Tente novamente.");
    }
  };

  const handleDelete = async (nome) => {
    try {
      await deleteLogin(nome);
      setMensagem("Funcionário deletado com sucesso!");
      const updatedFuncionarios = await getUsuario();
      setFuncionarios(updatedFuncionarios);
      setConfirmandoExclusao(null);
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      setMensagem(
        error.response?.data?.error || "Erro ao deletar funcionário. Tente novamente."
      );
    }
  };

  return (
    <div className="add-funcionario-container">
      <Navbar />
      <h1 className="add-funcionario-titulo">
        GERENCIAMENTO DE <span>FUNCIONÁRIOS</span>
      </h1>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <div className="grid-container">
        <div className="funcionarios-list">
          <h2 className="funcionarios-titulo">Funcionários Cadastrados</h2>
          <table className="funcionarios-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.email}</td>
                  <td>{funcionario.tipo_funcionario}</td>
                  <td>
                    <button
                      className="btn-edit-funcionario"
                      onClick={() => handleEdit(funcionario)}
                    >
                      {editando && editando.id === funcionario.id
                        ? "Cancelar"
                        : "Editar"}
                    </button>
                    <button
                      className="btn-delete-funcionario"
                      onClick={() => setConfirmandoExclusao(funcionario.nome)}
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
          className="add-funcionario-form"
        >
          {editando && (
            <div className="form-group">
              <label htmlFor="nomeOriginal" className="form-label">
                Nome Original do Funcionário
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
              Nome do Funcionário
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-input"
              id="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              maxLength={65}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo_funcionario" className="form-label">
              Tipo de Funcionário
            </label>
            <select
              className="form-input"
              id="tipo_funcionario"
              value={formData.tipo_funcionario}
              onChange={handleChange}
              required
            >
              <option value="Funcionario">Funcionário</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <button type="submit" className="btn-add-funcionario">
            {editando ? "Salvar Alterações" : "Adicionar"}
          </button>
        </form>
      </div>
      {confirmandoExclusao && (
        <div className="popup-modal">
          <div className="popup-content">
            <h2>Tem certeza que deseja excluir este funcionário?</h2>
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

export default AddFuncionario;

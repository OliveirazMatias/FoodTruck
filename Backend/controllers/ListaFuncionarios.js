import ListaFuncionarios from "../models/ListaFuncionarios.js";
import { Op } from "sequelize";
import Pedidos from "../models/Pedidos.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Chave secreta para o JWT (deve estar em variáveis de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

export const postLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const funcionario = await ListaFuncionarios.findOne({ where: { email } });

    if (!funcionario) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Gerando token JWT
    const token = jwt.sign(
      { id: funcionario.id, email: funcionario.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
};

export const postCadastro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificando se o email já está cadastrado
    const funcionarioExistente = await ListaFuncionarios.findOne({
      where: { email },
    });
    if (funcionarioExistente) {
      return res
        .status(400)
        .json({ error: "O e-mail já está cadastrado no sistema." });
    }

    // Criptografando a senha antes de salvar
    const saltRounds = 10; // Número de rounds para gerar o hash
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const novoFuncionario = await ListaFuncionarios.create({
      nome,
      email,
      senha: senhaHash, // Salva a senha criptografada
    });

    return res
      .status(201)
      .json({
        message: "Funcionário cadastrado com sucesso.",
        novoFuncionario,
      });
  } catch (error) {
    console.error("Erro ao adicionar Funcionário:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export const deleteLogin = async (req, res) => {
  try {
    const { nome } = req.body; // Use req.body instead of req.params

    if (!nome) {
      return res
        .status(400)
        .json({ error: "O nome do funcionário é obrigatório." });
    }

    const funcionario = await ListaFuncionarios.findOne({ where: { nome } });

    if (!funcionario) {
      return res
        .status(404)
        .json({ error: "Nome do funcionário não encontrado." });
    }

    await Pedidos.update(
      { id_funcionario: 999 }, // Placeholder
      { where: { id_funcionario: funcionario.id } } // Use funcionario.id
    );

    // Deletar o funcionário
    await funcionario.destroy();

    return res
      .status(200)
      .json({ message: "Funcionário deletado do sistema com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar Funcionário do Sistema:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};
// Deletar Cadastro pra nova tela

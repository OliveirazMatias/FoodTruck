import ListaFuncionarios from "../models/ListaFuncionarios.js";
import { Op, where } from "sequelize";
import Pedidos from "../models/Pedidos.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ||"pneumoultramicroscopicossilicovulcanoconiótico";

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
      { id: funcionario.id, email: funcionario.email, tipo_funcionario: funcionario.tipo_funcionario },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Token gerado:", token);

    res.status(200).json({
      message: "Login bem-sucedido",
      token,
      tipo_funcionario: funcionario.tipo_funcionario, // Inclui tipo_funcionario na resposta
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
};

export const postCadastro = async (req, res) => {
  try {
    const { nome, email, senha, tipo_funcionario } = req.body;

    // Verificando se o email já está cadastrado
    const funcionarioExistente = await ListaFuncionarios.findOne({
      where: { email },
    });
    if (funcionarioExistente) {
      return res
        .status(400)
        .json({ error: "O e-mail já está cadastrado no sistema." });
    }

    const saltRounds = 10; // Número de rounds para gerar o hash
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const novoFuncionario = await ListaFuncionarios.create({
      nome,
      email,
      senha: senhaHash, // Salva a senha criptografada
      tipo_funcionario
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
    const { nome } = req.body;

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
    await funcionario.destroy();

    return res
      .status(200)
      .json({ message: "Funcionário deletado do sistema com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar Funcionário do Sistema:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const funcionario = await ListaFuncionarios.findAll()
    return res.status(200).json(funcionario);
  } catch (error) {
    console.error("Erro ao buscar Funcionário:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export const updateUsuario = async (req, res) => {
  try {
    const { nome_original, nome, email, senha, tipo_funcionario } = req.body;

    // Verifica se o funcionário com o nome_original existe
    const funcionario = await ListaFuncionarios.findOne({
      where: { nome: nome_original },
    });

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }

    // Verifica se o email já está sendo usado por outro funcionário
    const emailExistente = await ListaFuncionarios.findOne({
      where: {
        email,
        id: { [Op.ne]: funcionario.id }, // Exclui o funcionário atual da verificação
      },
    });

    if (emailExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado por outro funcionário." });
    }

    // Atualiza a senha apenas se uma nova senha for fornecida
    const senhaHash = senha ? await bcrypt.hash(senha, 10) : funcionario.senha;

    // Atualiza os dados do funcionário
    const updatedFuncionario = await funcionario.update({
      nome,
      email,
      senha: senhaHash,
      tipo_funcionario,
    });

    res.json({
      message: "Funcionário atualizado com sucesso",
      updatedFuncionario,
    });
  } catch (error) {
    console.error("Erro ao atualizar Funcionário:", error);
    res.status(500).json({ error: "Erro ao atualizar Funcionário" });
  }
};

export const autentificar = async (req, res) => {
}

export const listarTodosFuncionarios = async (req, res) => {
  try {
    const funcionarios = await ListaFuncionarios.findAll({
      attributes: ['id', 'nome', 'email', 'tipo_funcionario'], // Retorna apenas os campos necessários
    });

    res.status(200).json(funcionarios);
  } catch (error) {
    console.error("Erro ao listar funcionários:", error);
    res.status(500).json({ error: "Erro ao listar funcionários." });
  }
};
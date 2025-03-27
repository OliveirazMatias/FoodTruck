import ListaFuncionarios from  "../models/ListaFuncionarios.js";
import { Op } from "sequelize";
import Pedidos from "../models/Pedidos.js";



export const getLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const funcionario = await ListaFuncionarios.findOne({where: { email: email, senha: senha }});

        if (funcionario) {
            res.status(200).json({ message: "Login bem-sucedido", funcionario });
        } else {
            res.status(401).json({ error: "email incorreto." });
        }
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }

} //Fazer Login

export const postCadastro = async (req, res) => {
    try {
        const { id, nome, email, senha } = req.body;

        const novoFuncionario = await ListaFuncionarios.create({
            id,
            nome,
            email,
            senha
        });

        return res.status(201).json(novoFuncionario);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "O e-mail já está cadastrado no sistema." });
        }
        console.error("Erro ao adicionar Funcionario:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
} // Post Cadastro pra nova tela


export const deleteLogin = async (req, res) => {
    try {
        const { nome } = req.body; // Use req.body instead of req.params

        if (!nome) {
            return res.status(400).json({ error: "O nome do funcionário é obrigatório." });
        }

        const funcionario = await ListaFuncionarios.findOne({ where: { nome } });

        if (!funcionario) {
            return res.status(404).json({ error: "Nome do funcionário não encontrado." });
        }

        await Pedidos.update(
            { id_funcionario: 999 }, // Placeholder
            { where: { id_funcionario: funcionario.id } } // Use funcionario.id
        );

        // Deletar o funcionário
        await funcionario.destroy();

        return res.status(200).json({ message: "Funcionário deletado do sistema com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar Funcionário do Sistema:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
// Deletar Cadastro pra nova tela

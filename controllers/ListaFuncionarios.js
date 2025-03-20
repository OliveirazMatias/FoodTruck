import ListaFuncionarios from  "../models/ListaFuncionarios.js";
import { Op } from "sequelize";



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



// Post Cadastro pra nova tela
// Deletar Cadastro pra nova tela


// Atualizar Topbar

import ListaFuncionarios from  "../models/ListaFuncionarios.js";
import { Op } from "sequelize";
const bcrypt = require('bcrypt')



export const getLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const funcionario = await ListaFuncionarios.findOne({
            where: {
                email: email,
                senha: senha
            }
        });
        const verificarSenha = bcrypt.compare(senha, funcionario.senha)
        if (funcionario && verificarSenha) {
            res.status(200).send(funcionario);
        } else {
            res.status(404).send("Usuario não encontrado.");
        }
    } catch (error) {
        return res.status(500).send(error)
    }
} //Fazer Login

export { getLogin };

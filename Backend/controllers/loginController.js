// controllers/loginController.js
import ListaFuncionarios from "../models/ListaFuncionarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await ListaFuncionarios.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ id: usuario.id }, "seuSegredoJWT", {
      expiresIn: "1d",
    });

    return res.json({
      token,
      nome: usuario.nome,
      tipo_funcionario: usuario.tipo_funcionario,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

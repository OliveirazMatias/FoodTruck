import jwt from 'jsonwebtoken';
import Funcionario from '../models/ListaFuncionarios.js';

const JWT_SECRET = process.env.JWT_SECRET || 'pneumoultramicroscopicossilicovulcanoconiótico'; // Use uma chave forte em produção

export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token && req.cookies.token) {
    token = req.cookies.token;
}

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const funcionario = await Funcionario.findByPk(decoded.id);

    if (!funcionario) {
      return res.status(401).json({ error: 'Acesso negado. Usuário não encontrado.' });
    }

    req.funcionario = funcionario; // Disponibiliza o objeto do funcionário na requisição
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(403).json({ error: 'Token inválido.' });
  }
};


export const verificarPapelUsuario = (papeisPermitidos) => {
  return (req, res, next) => {
      if (!req.funcionario) {
          return res.status(401).send('Não autenticado');
      }

      if (!papeisPermitidos.includes(req.funcionario.tipoUsuario)) {
          console.log(req.funcionario.tipoUsuario)
          return res.status(403).send('Acesso negado');
      }

      next();
  };
};

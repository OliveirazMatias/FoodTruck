const jwt = require('jsonwebtoken');
const Funcionario = require('../models/funcionario');

const JWT_SECRET = process.env.JWT_SECRET || 'pneumoultramicroscopicossilicovulcanoconiótico'; // Use uma chave forte em produção

const verificarToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

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

module.exports = verificarToken;
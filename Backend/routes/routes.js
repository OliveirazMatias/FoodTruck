import express from 'express';
import { postLanches, getLanches, getLanchesByDesc, updateLanches, deleteLanches } from '../controllers/ItemCardapio.js';
import { postLogin, postCadastro, deleteLogin, getUsuario, updateUsuario, listarTodosFuncionarios } from '../controllers/ListaFuncionarios.js';
import { postItemPedido, deleteItemPedido, getItemPedidoByPedido } from '../controllers/ItemPedido.js';
import { postPedidos, getPedidosByCEP, getPedidosByMesa, getPedidos, getPedidosByDate, deletePedidos } from '../controllers/Pedidos.js';
import { verificarToken, verificarPapelUsuario } from '../middleware/Middleware.js';

const routes = express.Router();

routes.post('/lanches', postLanches);
routes.get('/lanches', getLanches);
routes.get('/lanches/descricao', getLanchesByDesc);
routes.put('/lanches/update', updateLanches); 
routes.delete('/lanches/delete', deleteLanches); 

routes.post('/login', postLogin);
routes.post('/cadastro', postCadastro); // Já suporta tipo_funcionario
routes.delete('/delete/usuario', deleteLogin);
routes.get('/usuarios', getUsuario); // Já retorna tipo_funcionario
routes.put('/usuarios/update', updateUsuario); // Rota para atualizar funcionário

// ITENS PEDIDOS
routes.post('/itempedido', postItemPedido);
routes.delete('/delete/itempedido', deleteItemPedido);
routes.get('/itempedido', getItemPedidoByPedido);

routes.post('/pedidos', postPedidos);
routes.get('/pedidos', getPedidos);
routes.get('/pedidos/CEP', getPedidosByCEP); // Handles ?CEP= query
routes.get('/pedidos/mesa', getPedidosByMesa); // Handles ?Mesa= query
routes.post('/pedidos/data', getPedidosByDate); // Handles ?filtro= and ?data= query
routes.delete('/pedidos/delete', deletePedidos); // Handles ?id= query

routes.get('/meus-dados', verificarToken, (req, res) => {
    res.json({
        message: "Dados do funcionário acessados!",
        funcionario: req.funcionario
    });
});
routes.get('/admin/painel',
    verificarToken,
    verificarPapelUsuario(['Funcionario']), 
    (req, res) => {
        res.json({ message: "Bem-vindo ao painel de administrador!" });
    }
);

routes.get('/funcionarios',
    verificarToken,
    verificarPapelUsuario(['Administrador']), // Apenas administradores e gerentes podem acessar
    listarTodosFuncionarios // Controlador para listar todos os funcionários
);

export default routes;

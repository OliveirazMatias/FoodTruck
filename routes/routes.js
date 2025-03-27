import express from 'express'
import { getLanches, getLanchesByDesc } from '../controllers/ItemCardapio.js';
import { getLogin, postCadastro, deleteLogin } from '../controllers/ListaFuncionarios.js';
import { postItemPedido, deleteItemPedido, getItemPedidoByPedido } from '../controllers/ItemPedido.js';
import { postPedidos, getPedidosByCEP, getPedidosByMesa, getPedidos } from '../controllers/Pedidos.js';

const routes = express.Router();

routes.get('/lanches', getLanches);
routes.get('/lanches/descricao', getLanchesByDesc); // Handles ?descricao= query

routes.get('/login', getLogin);
routes.post('/cadastro', postCadastro)
routes.delete('/delete/usuario', deleteLogin)

// ITENS PEDIDOS
routes.get('/itempedido', getItemPedidoByPedido);
routes.post('/itempedido', postItemPedido);
routes.delete('/delete/itempedido', deleteItemPedido);

routes.post('/pedidos', postPedidos);
routes.get('/pedidos', getPedidos);
routes.get('/pedidos/CEP', getPedidosByCEP); // Handles ?CEP= query
routes.get('/pedidos/mesa', getPedidosByMesa); // Handles ?Mesa= query

export default routes;

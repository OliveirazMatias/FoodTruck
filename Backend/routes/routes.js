import express from 'express';
import { postLanches, getLanches, getLanchesByDesc, updateLanches, deleteLanches } from '../controllers/ItemCardapio.js';
import { postLogin, postCadastro, deleteLogin } from '../controllers/ListaFuncionarios.js';
import { postItemPedido, deleteItemPedido, getItemPedidoByPedido } from '../controllers/ItemPedido.js';
import { postPedidos, getPedidosByCEP, getPedidosByMesa, getPedidos } from '../controllers/Pedidos.js';

const routes = express.Router();

routes.post('/lanches', postLanches);
routes.get('/lanches', getLanches);
routes.get('/lanches/descricao', getLanchesByDesc);
routes.put('/lanches/update', updateLanches); 
routes.delete('/lanches/delete', deleteLanches); 

routes.post('/login', postLogin);
routes.post('/cadastro', postCadastro);
routes.delete('/delete/usuario', deleteLogin);

// ITENS PEDIDOS
routes.post('/itempedido', postItemPedido);
routes.delete('/delete/itempedido', deleteItemPedido);
routes.get('/itempedido', getItemPedidoByPedido);

routes.post('/pedidos', postPedidos);
routes.get('/pedidos', getPedidos);
routes.get('/pedidos/CEP', getPedidosByCEP); // Handles ?CEP= query
routes.get('/pedidos/mesa', getPedidosByMesa); // Handles ?Mesa= query

export default routes;

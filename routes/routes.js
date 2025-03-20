import express from 'express'
import { getLanches } from '../controllers/ItemCardapio.js';
import { getLogin } from '../controllers/ListaFuncionarios.js';
import { postItemPedido, deleteItemPedido } from '../controllers/ItemPedido.js';
import { postPedidos, getPedidosByCEP, getPedidosByMesa } from '../controllers/Pedidos.js';

const routes = express.Router();

routes.get('/lanches', getLanches);


routes.get('/login', getLogin);

routes.post('/itempedido', postItemPedido);
routes.delete('/itempedido/:id', deleteItemPedido);

routes.post('/pedidos', postPedidos);
routes.get('/pedidos', getPedidosByCEP); // Handles ?CEP= query
routes.get('/pedidos/mesa', getPedidosByMesa); // Handles ?Mesa= query

export default routes;

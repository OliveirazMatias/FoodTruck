import express from 'express'
import { getLanches } from '../controllers/ItemCardapio.js';
import { getLogin } from '../controllers/ListaFuncionarios.js';
import { postItemPedido, deleteItemPedido } from '../controllers/ItemPedido.js';

const routes = express.Router();

routes.get('/lanches', getLanches);


routes.get('/login', getLogin);

routes.post('/itempedido', postItemPedido);
routes.delete('/itempedido/:id', deleteItemPedido);

export default routes;

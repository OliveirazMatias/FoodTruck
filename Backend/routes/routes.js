import express from 'express';
import { postLanches, getLanches, getLanchesByDesc, updateLanches, deleteLanches } from '../controllers/ItemCardapio.js';
import { postLogin, postCadastro, deleteLogin, getUsuario, updateUsuario } from '../controllers/ListaFuncionarios.js';
import { postItemPedido, deleteItemPedido, getItemPedidoByPedido } from '../controllers/ItemPedido.js';
import { postPedidos, getPedidosByCEP, getPedidosByMesa, getPedidos, getPedidosByDate, deletePedidos } from '../controllers/Pedidos.js';

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


export default routes;

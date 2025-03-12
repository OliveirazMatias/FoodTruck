import express from 'express'
import { getLanches } from '../controllers/ItemCardapio.js';
import { getLogin } from '../controllers/ListaFuncionarios.js';

const routes = express.Router();

routes.get('/lanches', getLanches);


routes.get('/login', getLogin);

export default routes;

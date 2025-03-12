import express from 'express'
import { getLanches } from '../controllers/ItemCardapio.js';

const routes = express.Router();

routes.get('/lanches', getLanches);

export default routes;

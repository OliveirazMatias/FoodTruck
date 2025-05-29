import express from 'express';
import ItemCardapio from './models/ItemCardapio.js';
import ItemPedido from './models/ItemPedido.js';
import Pedidos from './models/Pedidos.js';
import ListaFuncionarios from './models/ListaFuncionarios.js';
import routes from './routes/routes.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);



// Alterar a ordem de sincronização
ItemCardapio.sync();
ListaFuncionarios.sync();
Pedidos.sync();
ItemPedido.sync(); // Sincronizar por último, pois depende de outros modelos


app.get('/', (req, res) => {
    res.json({ message: 'Backend: FUNCIONANDO' });
  });
  

app.listen(3001, () => console.log('servidor rodando na porta 3001'));
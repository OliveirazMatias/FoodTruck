import { MercadoPagoConfig, Order } from "mercadopago";
import ItemCardapio from "../models/ItemCardapio.js";
import ItemPedido from "../models/ItemPedido";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  options: { timeout: 5000 },
});

const order = new Order(client);

let title = 0

const body = {
  items: [
    {id:ItemPedido, title: ItemCardapio.nome, quantity: ItemPedido.quantidade, currency_id: 'BRL', unit_price: ItemPedido.preco_unitario},
  ],
  back_urls: {
    success: 'https://test.com/success',
    failure: 'https://test.com/failure',
    pending: 'https://test.com/pending',
  },

};

// Step 5: Create request options object - Optional
const requestOptions = {
  idempotencyKey: "<IDEMPOTENCY_KEY>",
};

// Step 6: Make the request
order.create({ body, requestOptions }).then(console.log).catch(console.error);

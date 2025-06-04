import { MercadoPagoConfig, Preference  } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();
// import ItemCardapio from "../models/ItemCardapio.js";
// import ItemPedido from "../models/ItemPedido";

console.log("Mercado Pago Access Token:", process.env.MERCADO_PAGO_ACCESS_TOKEN);


const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  options: { timeout: 5000 },
});

const preference = new Preference(client);

let title = 0

const body = {
  items: [
    // {id:ItemPedido, title: ItemCardapio.nome, quantity: ItemPedido.quantidade, currency_id: 'BRL', unit_price: ItemPedido.preco_unitario},
    {id: 1, title: "Item 1", quantity: 2, currency_id: 'BRL', unit_price: 100.00},
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

const response = await preference.create({ body })
  .then(console.log).catch(console.log);

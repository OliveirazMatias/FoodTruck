import database from "./database.js";
import ItemCardapio from "../models/ItemCardapio.js";

(async () => {
  await database.sync();

  const NovoFunca = await ItemCardapio.create({
    Nome: "X-SALADA",
    Descricao: "Hambúrguer, queijo, tomate, alface, picles e maionese.",
    Preco: 24.0,
    Quantidade: 1,
    data_entrada: new Date(),
    Disponibilidade: "disponível",
  });

  console.log(NovoFunca);
})();

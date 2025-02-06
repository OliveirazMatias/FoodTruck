(async () => {
    const database = require('./database');
    const ItemCardapio = require("./models/ItemCardapio");
  const ItemPedido = require("./models/ItemPedido");
  const ListaFuncionarios = require("./models/ListaFuncionarios");
  const Pedidos = require("./models/Pedidos");

  try {
    await sequelize.sync({ force: false }); // Cria as tabelas se não existirem
    console.log("Banco de dados sincronizado com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  } finally {
    await sequelize.close(); // Fecha a conexão após a sincronização
  }
})();

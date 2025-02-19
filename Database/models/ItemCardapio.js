import database from "../database.js";
import sequelize from "sequelize";

const ItemCardapio = database.define(
  "ItemCardapio",
  {
    ID: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Nome: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    Descricao: {
      type: sequelize.STRING(100),
      allowNull: false,
    },
    Preco: {
      type: sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    Quantidade: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    data_entrada: {
      type: sequelize.DATE,
      allowNull: false,
    },
    Disponibilidade: {
      type: sequelize.ENUM(
        "disponível",
        "indisponível",
        "temporariamente fora de estoque"
      ),
      allowNull: false,
    },
  },
  {
    tableName: "item_cardapio",
    timestamps: false,
  }
);

export default ItemCardapio;

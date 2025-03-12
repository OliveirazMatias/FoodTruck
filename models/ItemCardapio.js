import database from "../config/database.js";
import sequelize from "sequelize";

const ItemCardapio = database.define(
  "ItemCardapio",
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    descricao: {
      type: sequelize.STRING(100),
      allowNull: false,
    },
    preco: {
      type: sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    quantidade: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    data_entrada: {
      type: sequelize.DATE,
      allowNull: false,
    },
    disponibilidade: {
      type: sequelize.ENUM(
        "disponível",
        "indisponível",
        "temporariamente fora de estoque"
      ),
      allowNull: false,
    },
    imagem: {
      type: sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "item_cardapio",
    timestamps: false,
  }
);

export default ItemCardapio;

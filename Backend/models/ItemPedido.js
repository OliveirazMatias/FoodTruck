import database from "../config/database.js";
import sequelize from "sequelize";

const ItemPedido = database.define(
  "ItemPedido",
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_pedido: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Pedidos", // Certifique-se de que o nome do modelo está correto
        key: "id",
      },
      onDelete: "CASCADE",
    },
    id_item_do_cardapio: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ItemCardapio", // Certifique-se de que o nome do modelo está correto
        key: "id",
      },
      onDelete: "CASCADE",
    },
    quantidade: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    preco_unitario: {
      type: sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    observacao: {
      type: sequelize.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "item_pedido",
    timestamps: false,
  }
);

export default ItemPedido;

import database from "../config/database.js";
import sequelize from "sequelize";
import ListaFuncionarios from "./ListaFuncionarios.js";
import moment from "moment-timezone"; // Importa moment-timezone
import ItemPedido from "./ItemPedido.js"; // Importa ItemPedido

const timeZone = "America/Sao_Paulo"; // Fuso horário de São Paulo

const Pedidos = database.define(
  "Pedidos",
  {
    ID: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    id_funcionario: {
      type: sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: { model: ListaFuncionarios, key: "ID" },
      onDelete: "SET NULL",
    },
    tipo_pedido: {
      type: sequelize.ENUM("delivery", "comer no local"),
      allowNull: true,
    },
    nome_cliente: { type: sequelize.STRING(50), allowNull: true },
    Mesa: { type: sequelize.INTEGER, allowNull: true },
    CEP: { type: sequelize.STRING(8), allowNull: true },
    Numero: { type: sequelize.INTEGER(10), allowNull: true },
    Complemento: { type: sequelize.STRING(50), allowNull: true },
    Status: {
      type: sequelize.ENUM(
        "em preparação",
        "pronto para entrega",
        "entregue",
        "cancelado"
      ),
      allowNull: false,
    },
    data_criacao: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: () => new Date(), // Sequelize já trata como timestamp
    },
    data_entrega: { type: sequelize.DATE, allowNull: true },
    tipo_pagamento: {
      type: sequelize.ENUM("PIX", "Cartão", "Dinheiro"),
      allowNull: true,
    },
    Total: { type: sequelize.DECIMAL(10, 2), allowNull: false },
  },
  {
    tableName: "pedidos",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: false,
    hooks: {
      beforeCreate: (pedido) => {
        pedido.data_criacao = new Date(); // Usa Date diretamente
      },
      beforeUpdate: (pedido) => {
        if (pedido.changed("Status") && pedido.Status === "entregue") {
          pedido.data_entrega = new Date(); // Usa Date diretamente
        }
      },
    },
  }
);

Pedidos.belongsTo(ListaFuncionarios, {
  foreignKey: "id_funcionario",
  onDelete: "SET NULL",
});

Pedidos.hasMany(ItemPedido, {
  foreignKey: "id_pedido",
  as: "itens", // Alias para acessar os itens do pedido
  onDelete: "CASCADE",
});

ItemPedido.belongsTo(Pedidos, {
  foreignKey: "id_pedido",
  as: "pedido",
});

export default Pedidos;

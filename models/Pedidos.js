import database from "../database.js";
import sequelize from "sequelize";
import ListaFuncionarios from "./ListaFuncionarios.js";

const Pedidos = database.define(
  "Pedidos",
  {
    ID: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    id_funcionario: {
      type: sequelize.INTEGER,
      allowNull: true,
      references: { model: ListaFuncionarios, key: "ID" },
    },
    tipo_pedido: {
      type: sequelize.ENUM("delivery", "comer no local"),
      allowNull: false,
    },
    nome_cliente: { type: sequelize.STRING(50), allowNull: false },
    Mesa: { type: sequelize.INTEGER, allowNull: true },
    CEP: { type: sequelize.STRING(8), allowNull: true },
    Status: {
      type: sequelize.ENUM(
        "em preparação",
        "pronto para entrega",
        "entregue",
        "cancelado"
      ),
      allowNull: false,
    },
    data_criacao: { type: sequelize.DATE, allowNull: false },
    data_entrega: { type: sequelize.DATE, allowNull: true },
    tipo_pagamento: {
      type: sequelize.ENUM("PIX", "Cartão", "Dinheiro"),
      allowNull: false,
    },
    Total: { type: sequelize.DECIMAL(10, 2), allowNull: false },
  },
  {
    tableName: "pedidos",
    timestamps: false,
  }
);

Pedidos.belongsTo(ListaFuncionarios, { foreignKey: "id_funcionario" });

module.exports = Pedidos;

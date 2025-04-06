import database from "../config/database.js";
import sequelize from "sequelize";

const ListaFuncionarios = database.define(
  "ListaFuncionarios",
  {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: sequelize.STRING(50), allowNull: false },
    email: { type: sequelize.STRING(100), allowNull: false, unique: true },
    senha: { type: sequelize.STRING(65), allowNull: false },
  },
  {
    tableName: "lista_funcionarios",
    timestamps: false,
  }
);

export default ListaFuncionarios;

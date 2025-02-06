import database from '../database.js';
import sequelize from 'sequelize';

const ListaFuncionarios = database.define('ListaFuncionarios', {
    ID: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    Nome: { type: sequelize.STRING(50), allowNull: false },
    Email: { type: sequelize.STRING(100), allowNull: false, unique: true },
    Senha: { type: sequelize.STRING(50), allowNull: false }
}, {
    tableName: 'lista_funcionarios',
    timestamps: false
});

module.exports = ListaFuncionarios;

import database from '../database.js';
import { DataTypes } from 'sequelize';

const ItemCardapio = database.define('ItemCardapio', {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Nome: { type: DataTypes.STRING(50), allowNull: false },
    Descricao: { type: DataTypes.STRING(100), allowNull: false },
    Preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    Quantidade: { type: DataTypes.INTEGER, allowNull: false },
    data_entrada: { type: DataTypes.DATE, allowNull: false },
    Disponibilidade: { 
        type: DataTypes.ENUM('disponível', 'indisponível', 'temporariamente fora de estoque'), 
        allowNull: false 
    }
}, {
    tableName: 'item_cardapio',
    timestamps: false
});

export default ItemCardapio;
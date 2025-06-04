import database from "../config/database.js"
import sequelize from "sequelize";


const Estoque = database.define(
    "Estoque", {
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
    }, {
        tableName: "estoque",
        timestamps: false,
    }
)

export default Estoque;
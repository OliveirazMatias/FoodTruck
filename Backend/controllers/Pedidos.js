import Pedidos from "../models/Pedidos.js";
import moment from "moment-timezone"; // Importa moment-timezone
import { Op } from "sequelize"; // Importa operadores do Sequelize
import ItemPedido from "../models/ItemPedido.js"; // Importa o modelo ItemPedido

const timeZone = "America/Sao_Paulo"; // Fuso horário de São Paulo

export const postPedidos = async (req, res) => {
    try {
        const { id_funcionario, tipo_pedido, nome_cliente, Mesa, CEP, Status, tipo_pagamento } = req.body;

        const pedido = await Pedidos.create({
            id_funcionario,
            tipo_pedido,
            nome_cliente,
            Mesa,
            CEP,
            Status,
            tipo_pagamento,
            Total: 0, // Initialize Total as 0
        });

        const formattedPedido = {
            ...pedido.toJSON(),
            data_criacao: moment(pedido.data_criacao).tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),
        };

        res.status(201).json({ message: "Pedido criado com sucesso", pedido: formattedPedido });
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
};

export const getPedidosByCEP = async (req, res) => {
    try {
        const { CEP } = req.body; // Use query parameters
        let whereCondition = {};
        if (CEP) {
            whereCondition.CEP = CEP;
        }
        const pedidos = await Pedidos.findAll({ where: whereCondition });
        return res.status(200).json({ pedidos });
    } catch (error) {
        console.error("Erro ao buscar pedidos por CEP:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
};

export const getPedidosByMesa = async (req, res) => {
    try {
        const { Mesa } = req.body; // Use query parameters
        let whereCondition = {};
        if (Mesa) {
            whereCondition.Mesa = Mesa;
        }
        const pedidos = await Pedidos.findAll({ where: whereCondition });
        return res.status(200).json({ pedidos });
    } catch (error) {
        console.error("Erro ao buscar pedidos por Mesa:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
}


export const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll();
        return res.status(200).json({ pedidos });
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
};

export const getPedidosByDate = async (req, res) => {
    try {
        const { filtro, data } = req.body; // Recebe o filtro e a data do corpo da requisição
        console.log("Filtro recebido:", filtro, "Data recebida:", data); // Log para depuração
        let whereCondition = {};

        const today = moment().tz(timeZone).startOf("day");
        const startOfWeek = moment().tz(timeZone).startOf("week");
        const startOfMonth = moment().tz(timeZone).startOf("month");

        if (filtro === "hoje") {
            whereCondition.data_criacao = {
                [Op.gte]: today.toDate(),
                [Op.lt]: today.clone().add(1, "day").toDate(),
            };
        } else if (filtro === "semana") {
            whereCondition.data_criacao = {
                [Op.gte]: startOfWeek.toDate(),
                [Op.lt]: startOfWeek.clone().add(7, "days").toDate(),
            };
        } else if (filtro === "mes") {
            whereCondition.data_criacao = {
                [Op.gte]: startOfMonth.toDate(),
                [Op.lt]: startOfMonth.clone().add(1, "month").toDate(),
            };
        } else if (filtro === "data_especifica" && data) {
            const specificDate = moment(data).tz(timeZone).startOf("day");
            whereCondition.data_criacao = {
                [Op.gte]: specificDate.toDate(),
                [Op.lt]: specificDate.clone().add(1, "day").toDate(),
            };
        } else {
            console.error("Filtro inválido ou data não fornecida."); // Log de erro
            return res.status(400).json({ error: "Filtro inválido ou data não fornecida." });
        }

        const pedidos = await Pedidos.findAll({
            where: whereCondition,
            include: [
                {
                    model: ItemPedido,
                    as: "itens", // Certifique-se de que o alias está correto
                },
            ],
        });
        return res.status(200).json({ pedidos });
    } catch (error) {
        console.error("Erro ao buscar pedidos por data:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
};


export const deletePedidos = async (req, res) => {
    try {
        const { id } = req.body; // Use query parameters
        const pedido = await Pedidos.destroy({ where: { id } });
        if (pedido) {
            return res.status(200).json({ message: "Pedido deletado com sucesso." });
        } else {
            return res.status(404).json({ error: "Pedido não encontrado." });
        }
    } catch (error) {
        console.error("Erro ao deletar pedido:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
};
// UPDATE PEDIDOS

// Get vendo Mesa & CEP para comanda
// Get vendo por Data_Criação, com varios filtros(hoje, semana, mes, data especifica)
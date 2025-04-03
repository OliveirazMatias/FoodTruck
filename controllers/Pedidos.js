import Pedidos from "../models/Pedidos.js";
import moment from "moment-timezone"; // Importa moment-timezone

const timeZone = "America/Sao_Paulo"; // Fuso horário de São Paulo

export const postPedidos = async (req, res) => {
    try {
        const { id_funcionario, tipo_pedido, nome_cliente, Mesa, CEP, Status, data_criacao, data_entrega, tipo_pagamento } = req.body;

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

export const getPedidosData = async (req, res) => {
    
}
//API Mercado Pago no Post


export const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll();
        return res.status(200).json({ pedidos });
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
};
// UPDATE PEDIDOS

// Get vendo Mesa & CEP para comanda
// Get vendo por Data_Criação, com varios filtros(hoje, semana, mes, data especifica)
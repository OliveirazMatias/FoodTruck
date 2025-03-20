import Pedidos from "../models/Pedidos.js";
import ItemPedido from "../models/ItemPedido.js";

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
            data_criacao,
            data_entrega,
            tipo_pagamento,
            Total: 0, // Initialize Total as 0
        });


        res.status(201).json({ message: "Pedido criado com sucesso", pedido });
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return res.status(500).json({ error: "Erro no servidor." });
    }
};

export const getPedidosByCEP = async (req, res) => {
    try {
        const { CEP } = req.query; // Use query parameters
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
        const { Mesa } = req.query; // Use query parameters
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

// Get vendo Mesa & CEP para comanda
// Get vendo por Data_Criação, com varios filtros(hoje, semana, mes, data especifica)
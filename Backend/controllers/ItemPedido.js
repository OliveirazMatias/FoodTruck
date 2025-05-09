import ItemPedido from "../models/ItemPedido.js";
import ItemCardapio from "../models/ItemCardapio.js";
import Pedidos from "../models/Pedidos.js";

export const postItemPedido = async (req, res) => {
    try {
        console.log("Requisição recebida no postItemPedido:", req.body); // Log dos dados recebidos
        const { id_pedido, id_item_do_cardapio, quantidade, observacao } = req.body;

        // Validação de campos obrigatórios
        if (!id_pedido || !id_item_do_cardapio || !quantidade) {
            console.error("Dados ausentes ou inválidos:", req.body);
            return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        // Verifique se o item do cardápio existe
        const item = await ItemCardapio.findByPk(id_item_do_cardapio);
        if (!item) {
            console.error("Item do cardápio não encontrado:", id_item_do_cardapio);
            return res.status(404).json({ error: "Item do cardápio não encontrado." });
        }

        const preco_unitario = item.preco;
        const subtotal = preco_unitario * quantidade;

        // Verifique se o pedido existe
        const pedido = await Pedidos.findByPk(id_pedido);
        if (!pedido) {
            console.error("Pedido não encontrado:", id_pedido);
            return res.status(404).json({ error: "Pedido não encontrado." });
        }

        // Crie o item do pedido
        const novoItemPedido = await ItemPedido.create({
            id_pedido,
            id_item_do_cardapio,
            quantidade,
            preco_unitario,
            subtotal,
            observacao,
        });

        pedido.Total = parseFloat(pedido.Total) + subtotal;
        await pedido.save();

        console.log("Item do pedido criado com sucesso:", novoItemPedido);
        return res.status(201).json(novoItemPedido);
    } catch (error) {
        console.error("Erro ao adicionar item ao pedido:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}; // Adicionar Item ao Pedido


export const deleteItemPedido = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID do item é obrigatório." });
        }

        const item = await ItemPedido.findByPk(id);

        if (!item) {
            return res.status(404).json({ error: "Item do Pedido não encontrado." });
        }

        await item.destroy();

        return res.status(200).json({ message: "Item do Pedido deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar item do Pedido:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}; // Deletar Item do Pedido

export const getItemPedidoByPedido = async (req, res) => {
    try {
        const { id_pedido } = req.body;
        let whereCondition = {};
        if (id_pedido) {
            whereCondition.id_pedido = id_pedido;
        }

        const itemPedido = await ItemPedido.findAll({ where: whereCondition });
        res.json(itemPedido);
    } catch (error) {
        console.error("Erro ao buscar item do pedido:", error);
        res.status(500).json({ error: "Erro ao buscar item do pedido" });
    }
}; 

export const getPedidos = async (req, res) => {
    try {
        const { id_pedido } = req.body;
        let whereCondition = {};
        if (id_pedido) {
            whereCondition.id_pedido = id_pedido;
        }

        const pedidos = await Pedidos.findAll({ where: whereCondition });
        res.json(pedidos);
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        res.status(500).json({ error: "Erro ao buscar pedidos" });
    }
}
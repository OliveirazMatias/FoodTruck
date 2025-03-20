import ItemPedido from "../models/ItemPedido.js";
import ItemCardapio from "../models/ItemCardapio.js";
import Pedidos from "../models/Pedidos.js";

export const postItemPedido = async (req, res) => {
    try {
        const { id_pedido, id_item_do_cardapio, quantidade, observacao } = req.body;

        const item = await ItemCardapio.findByPk(id_item_do_cardapio);
        if (!item) {
            return res.status(404).json({ error: "Item do cardápio não encontrado." });
        }

        const preco_unitario = item.preco;
        const subtotal = preco_unitario * quantidade;

        const novoItemPedido = await ItemPedido.create({
            id_pedido,
            id_item_do_cardapio,
            quantidade,
            preco_unitario,
            subtotal,
            observacao
        });

        const itensPedido = await ItemPedido.findAll({ where: { id_pedido } });
        const total = itensPedido.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

        const pedido = await Pedidos.findByPk(id_pedido);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido não encontrado." });
        }

        pedido.Total = total;
        await pedido.save();

        return res.status(201).json(novoItemPedido);
    } catch (error) {
        console.error("Erro ao adicionar item ao pedido:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}; // Adicionar Item ao Pedido


export const deleteItemPedido = async (req, res) => {
    try {
        const { id } = req.params; 

        const item = await ItemPedido.findByPk(id);

        if (!item) {
            return res.status(404).json({ error: "Item do Pedido não encontrado." });
        }

        await item.destroy(); 

        // atualizar quando excluir
        return res.status(200).json({ message: "Item do Pedido deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar item do Pedido:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}; // Deletar Item do Pedido

// GET itempedido por id_pedido pra comanda

// IMPLEMENTAÇÂO DE CACHE
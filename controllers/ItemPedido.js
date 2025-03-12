import ItemPedido from "../models/ItemPedido.js";
import Pedidos from "../models/Pedidos.js";
import ItemCardapio from "../models/ItemCardapio.js";


export const getListarItens= async (req, res) => {
    try {
        const itens = await ItemPedido.findAll({
            include: [
                { model: Pedidos, attributes: ["id", "status"] },
                { model: ItemCardapio, attributes: ["Nome", "Preco"] }
            ]
        });
        res.json(itens);
    } catch (error) {
        console.error("Erro ao buscar itens do pedido:", error);
        res.status(500).json({ error: "Erro ao buscar itens do pedido" });
    }
};

/**
 * Adiciona um item ao carrinho (ItemPedido).
 */
export const adicionarItemPedido = async (req, res) => {
    try {
        const { id_pedido, id_item_do_cardapio, quantidade } = req.body;

        // Buscar o item do cardápio para pegar o preço
        const item = await ItemCardapio.findByPk(id_item_do_cardapio);
        if (!item) return res.status(404).json({ error: "Item do cardápio não encontrado" });

        const preco_unitario = item.Preco;
        const subtotal = preco_unitario * quantidade;

        const novoItem = await ItemPedido.create({
            id_pedido,
            id_item_do_cardapio,
            quantidade,
            preco_unitario,
            subtotal
        });

        res.status(201).json(novoItem);
    } catch (error) {
        console.error("Erro ao adicionar item ao pedido:", error);
        res.status(500).json({ error: "Erro ao adicionar item ao pedido" });
    }
};

/**
 * Remove um item do carrinho.
 */
export const removerItemPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ItemPedido.findByPk(id);
        if (!item) return res.status(404).json({ error: "Item não encontrado" });

        await item.destroy();
        res.json({ message: "Item removido com sucesso" });
    } catch (error) {
        console.error("Erro ao remover item do pedido:", error);
        res.status(500).json({ error: "Erro ao remover item do pedido" });
    }
};


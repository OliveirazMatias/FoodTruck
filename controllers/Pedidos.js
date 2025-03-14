import Pedidos from "../models/Pedidos";

export const postPedidos = async (req, res) => {
    try {
        const { id, id_item_do_cardapio, quantidade, observacao } = req.body;

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

        return res.status(201).json(novoItemPedido);
    } catch (error) {
        console.error("Erro ao adicionar item ao pedido:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

// POST - Item_Pedidos, Consumir no Local(Mesa) ou Entrega(CEP), Forma de Pagamento/API Mercado Pago

// Get vendo Mesa & CEP

// Get vendo por Data_Criação, com varios filtros(hoje, semana, mes, data especifica)
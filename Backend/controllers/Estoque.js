import Estoque from "../models/Estoque.js";

export const postEstoque = async (req, res) => {
    try {
        const { nome, quantidade, data_entrada, disponibilidade } = req.body;
        const novoItem = await Estoque.create({ nome, quantidade, data_entrada, disponibilidade });
        res.status(201).json({ message: "Item adicionado ao estoque com sucesso.", item: novoItem });
    } catch (error) {
        console.error("Erro ao adicionar item ao estoque:", error);
        res.status(500).json({ error: "Erro no servidor." });
    }
};

export const getEstoque = async (req, res) => {
    try {
        const itens = await Estoque.findAll();
        res.status(200).json({ itens });
    } catch (error) {
        console.error("Erro ao buscar itens do estoque:", error);
        res.status(500).json({ error: "Erro no servidor." });
    }
};

export const updateEstoque = async (req, res) => {
    try {
        const { id, nome, quantidade, data_entrada, disponibilidade } = req.body;
        const itemAtualizado = await Estoque.update(
            { nome, quantidade, data_entrada, disponibilidade },
            { where: { id } }
        );
        if (itemAtualizado[0] > 0) {
            res.status(200).json({ message: "Item atualizado com sucesso." });
        } else {
            res.status(404).json({ error: "Item não encontrado." });
        }
    } catch (error) {
        console.error("Erro ao atualizar item do estoque:", error);
        res.status(500).json({ error: "Erro no servidor." });
    }
};

export const deleteEstoque = async (req, res) => {
    try {
        const { id } = req.body;
        const itemDeletado = await Estoque.destroy({ where: { id } });
        if (itemDeletado) {
            res.status(200).json({ message: "Item deletado com sucesso." });
        } else {
            res.status(404).json({ error: "Item não encontrado." });
        }
    } catch (error) {
        console.error("Erro ao deletar item do estoque:", error);
        res.status(500).json({ error: "Erro no servidor." });
    }
};

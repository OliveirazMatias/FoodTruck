import ItemCardapio from "../models/ItemCardapio.js";
import { Op } from "sequelize";

export const getLanches = async (req, res) => {
    try {
        const { id } = req.query;	
        let whereCondition = {}; 
        if (id) {
            whereCondition.ID = id; 
        }

        const itemcardapio = await ItemCardapio.findAll({ where: whereCondition });
        res.json(itemcardapio);
        } 
        catch (error) {
            console.error('Erro ao buscar lanches:', error);
            res.status(500).json({ error: 'Erro ao buscar lanches' });    
    }
}; // Buscar os Lanches

export const getLanchesByDesc = async (req, res) => {
    try {
        const { descricao } = req.query;
        let whereCondition = {};
        if (descricao) {
            whereCondition.descricao = { [Op.like]: `%${descricao}%` };
        }
        const itemcardapio = await ItemCardapio.findAll({ where: whereCondition });
        res.json(itemcardapio);
    } catch (error) {
        console.error('Erro ao buscar lanches pela descrição:', error);
        res.status(500).json({ error: 'Erro ao buscar lanches pela descrição' });
    }
}


// Get lanche pela descricao pro estoque
// Post Lanches pra nova tela
// Delete Lanches pra nova tela
// Update Lanches pra nova tela

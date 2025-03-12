import ItemCardapio from "../models/ItemCardapio.js";
import { Op } from "sequelize";

const getLanches = async (req, res) => {
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



export { getLanches }
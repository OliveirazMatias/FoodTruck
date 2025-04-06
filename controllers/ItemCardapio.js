import ItemCardapio from "../models/ItemCardapio.js";
import { Op } from "sequelize";
import moment from "moment-timezone"; 

const timeZone = "America/Sao_Paulo"; 

export const getLanches = async (req, res) => {
  try {
    const { id } = req.query;
    let whereCondition = {};
    if (id) {
      whereCondition.ID = id;
    }

    const itemcardapio = await ItemCardapio.findAll({ where: whereCondition });
    res.json(itemcardapio);
  } catch (error) {
    console.error("Erro ao buscar lanches:", error);
    res.status(500).json({ error: "Erro ao buscar lanches" });
  }
}; 

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
    console.error("Erro ao buscar lanches pela descrição:", error);
    res.status(500).json({ error: "Erro ao buscar lanches pela descrição" });
  }
};

export const postLanches = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      preco,
      data_entrada,
      disponibilidade,
      imagem,
      tipo,
    } = req.body;
    const novoLanche = await ItemCardapio.create({
      nome,
      descricao,
      preco,
      data_entrada,
      disponibilidade,
      imagem,
      tipo,
    });

    
    const formattedLanche = {
          ...novoLanche.toJSON(),
          data_entrada: moment(novoLanche.data_entrada).tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),
    };
    

    res
      .status(201)
      .json({ message: "Lanche adicionado com sucesso", novoLanche: formattedLanche });
  } catch (error) {
    console.error("Erro ao adicionar lanche:", error);
    res.status(500).json({ error: "Erro ao adicionar lanche" });
  }
};

export const updateLanches = async (req, res) => {
  try {
    const {
      nome_original,
      nome,
      descricao,
      preco,
      data_entrada,
      disponibilidade,
      imagem,
      tipo,
    } = req.body;

    const lanche = await ItemCardapio.findOne({
      where: { nome: nome_original },
    });
    if (!lanche) {
      return res.status(404).json({ message: "Lanche não encontrado" });
    }

    const updateLanche = await lanche.update({
      nome,
      descricao,
      preco,
      data_entrada,
      disponibilidade,
      imagem,
      tipo,
    });

    const formattedLanche = {
      ...updateLanche.toJSON(),
      data_entrada: moment(updateLanche.data_entrada).tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),
};


    res.json({ message: "Lanche atualizado com sucesso", updateLanche: formattedLanche });
  } catch (error) {
    console.error("Erro ao atualizar lanche:", error);
    res.status(500).json({ error: "Erro ao atualizar lanche" });
  }
}; 

export const deleteLanches = async (req, res) => {
  try {
    const { id } = req.body;
    const lanche = await ItemCardapio.findByPk(id);
    if (!lanche) {
      return res.status(404).json({ message: "Lanche não encontrado" });
    }
    await lanche.destroy();
    res.json({ message: "Lanche deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar lanche:", error);
    res.status(500).json({ error: "Erro ao deletar lanche" });
  }
}; 
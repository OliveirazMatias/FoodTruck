import http from "./http";

// TELA DE CARDAPIO

export const getLanches = async () => {
  try {
    const response = await http.get("/lanches"); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lanches:", error);
    throw error;
  }
}

export const postPedidos = async (pedido) => {
  try {
    const response = await http.post("/pedidos", pedido);
    return response.data;
  } catch (error) {
    console.error("Error posting pedido:", error);
    throw error;
  }
}

export const postItemPedido = async (itemPedido) => {
  try {
    const response = await http.post("/itempedido", itemPedido); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar item ao pedido:", error.response?.data || error.message);
    throw error;
  }
}
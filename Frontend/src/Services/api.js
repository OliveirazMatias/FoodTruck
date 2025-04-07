import http from "./http";

// TELA DE CARDAPIO

export const getLanches = async () => {
  try {
    const response = await http.get("/lanches");
    return response.data;
  } catch (error) {
    console.error("Error fetching lanches:", error);
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
    const response = await http.post("/itempedido", itemPedido);
    return response.data;
  } catch (error) {
    console.error("Error posting itemPedido:", error);
    throw error;
  }
}
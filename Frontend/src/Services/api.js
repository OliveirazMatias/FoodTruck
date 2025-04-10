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

// TELA DE LOGIN
 
export const postCadastro = async (funcionario) => {
  try {
    const response = await http.post("/cadastro", funcionario); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar funcionário:", error.response?.data || error.message);
    throw error;
  }
}

export const postLogin = async (login) => {
  try {
    const response = await http.post("/login", login); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data || error.message);
    throw error;
  }
}

export const deleteLogin = async (nome) => {
  try {
    const response = await http.delete("/delete/usuario", { data: { nome } }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error.response?.data || error.message);
    throw error;
  }
}
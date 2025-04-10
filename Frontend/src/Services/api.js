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




// TELA DE LOGIN

export const postLogin = async (login) => {
  try {
    const response = await http.post("/login", login); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data || error.message);
    throw error;
  }
}



// TELA DE CARRINHO

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




// TELA DE COMANDAS

export const getPedidosByCEP = async (cep) => {
  try {
    const response = await http.post("/pedidos/cep", { CEP: cep }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos por CEP:", error.response?.data || error.message);
    throw error;
  }
}

export const getPedidosByMesa = async (mesa) => {
  try {
    const response = await http.post("/pedidos/mesa", { Mesa: mesa }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos por Mesa:", error.response?.data || error.message);
    throw error;
  }
}

export const getPedidos = async () => {
  try {
    const response = await http.get("/pedidos"); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error.response?.data || error.message);
    throw error;
  }
}

export const deleteItemPedido = async (id) => {
  try {
    const response = await http.delete("/delete/itempedido", { data: { id } }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar item do pedido:", error.response?.data || error.message);
    throw error;
  }
}

// TELA DE HISTORICO
export const getPedidosData = async (data) => { // Para Fazer
  try {
    const response = await http.post("/pedidos/data", { data }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos por data:", error.response?.data || error.message);
    throw error;
  }
}

// Tela de Mesas
export const getItemPedidoByPedido = async (pedido) => {
  try {
    const response = await http.post("/itempedido", { pedido }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar itens do pedido:", error.response?.data || error.message);
    throw error;
  }
}


// ESTOQUE
export const getLanchesByDesc = async (descricao) => {
  try {
    const response = await http.post("/lanches/descricao", { descricao }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lanches por descrição:", error.response?.data || error.message);
    throw error;
  }
}

// MAIS CONTROLLERS DPS



// OUTROS CRUD 
export const postLanches = async (lanches) => {
  try {
    const response = await http.post("/lanches", lanches); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar lanches:", error.response?.data || error.message);
    throw error;
  }
}

export const updateLanches = async (lanches) => {
  try {
    const response = await http.put("/lanches/update", lanches); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar lanches:", error.response?.data || error.message);
    throw error;
  }
}

export const deleteLanches = async (id) => {
  try {
    const response = await http.delete("/lanches/delete", { data: { id } }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar lanches:", error.response?.data || error.message);
    throw error;
  }
}

export const postCadastro = async (funcionario) => {
  try {
    const response = await http.post("/cadastro", funcionario); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar funcionário:", error.response?.data || error.message);
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
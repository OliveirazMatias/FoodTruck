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
};

// TELA DE LOGIN

export const postLogin = async (login) => {
  try {
    const response = await http.post("/login", login); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao fazer login:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// TELA DE CARRINHO

export const postPedidos = async (pedido) => {
  try {
    const response = await http.post("/pedidos", pedido);
    return response.data;
  } catch (error) {
    console.error("Error posting pedido:", error);
    throw error;
  }
};

export const postItemPedido = async (itemPedido) => {
  try {
    const response = await http.post("/itempedido", itemPedido); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao adicionar item ao pedido:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// TELA DE COMANDAS
export const postCadastro = async (funcionario) => {
  try {
    const response = await http.post("/cadastro", funcionario); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar pedidos por CEP:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getPedidosByMesa = async (mesa) => {
  try {
    const response = await http.post("/pedidos/mesa", { Mesa: mesa }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar pedidos por Mesa:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getPedidos = async () => {
  try {
    const response = await http.get("/pedidos"); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar pedidos:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteItemPedido = async (id) => {
  try {
    const response = await http.delete("/delete/itempedido", { data: { id } });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar item do pedido:", error.response?.data || error.message);
    throw error;
  }
};

// TELA DE HISTORICO
export const getPedidosByDate = async (filtro, data = null) => {
  try {
    const requestBody = { filtro }; // Garante que o filtro seja enviado
    if (data) {
      requestBody.data = data; // Inclui a data apenas se ela for fornecida
    }
    console.log("Enviando para o backend:", requestBody); // Log para depuração
    const response = await http.post("/pedidos/data", requestBody);
    console.log("Resposta do backend:", response.data); // Log para depuração
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar pedidos por data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Tela de Mesas
export const getItemPedidoByPedido = async (pedido) => {
  try {
    const response = await http.post("/itempedido", { pedido }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar itens do pedido:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ESTOQUE
export const getLanchesByDesc = async (descricao) => {
  try {
    const response = await http.post("/lanches/descricao", { descricao }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar lanches por descrição:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// MAIS CONTROLLERS DPS

// OUTROS CRUD
export const postLanches = async (lanches) => {
  try {
    const response = await http.post("/lanches", lanches); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao adicionar lanches:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateLanches = async (lanches) => {
  try {
    const response = await http.put("/lanches/update", lanches); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao atualizar lanches:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteLanches = async (id) => {
  try {
    const response = await http.delete("/lanches/delete", { data: { id } }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao deletar lanches:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteLogin = async (nome) => {
  try {
    const response = await http.delete("/delete/usuario", { data: { nome } }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao deletar funcionário:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUsuario = async (nome) => {
  try {
    const response = await http.get("/usuarios", { data: { nome } }); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao achar os funcionário:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUsuario = async (usuario) => {
  try {
    const response = await http.put("/usuarios/update", usuario); // Endpoint correto
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao atualizar funcionário:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const pagamentoPix = async (dadosPagamento) => {
  try {
    const response = await http.post("/pagamento/pix", dadosPagamento); // Chamada para pagamento via PIX
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao processar pagamento PIX:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const pagamentoCartao = async (dadosPagamento) => {
  try {
    const response = await http.post("/pagamento/cartao", dadosPagamento); // Chamada para pagamento via cartão
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao processar pagamento com cartão:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const verificarStatusPagamento = async (paymentId) => {
  try {
    const response = await http.get(`/pagamento/status/${paymentId}`); // Verificar status do pagamento
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao verificar status do pagamento:",
      error.response?.data || error.message
    );
    throw error;
  }
};
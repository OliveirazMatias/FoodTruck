import "../TelasClientesCss/Carrinho.css";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import carrinho from "../../assets/cardapio/shopping-cart.svg";
import { Lanches } from "./Cardapio";
import {
  getLanches,
  deleteItemPedido,
  postPedidos,
  postItemPedido,
  pagamentoPix,
  pagamentoCartao,
} from "../../Services/api";
import axios from "axios";
import Navbar from "../../components/NavBar/navbar.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  width: "35%",
  bgcolor: "#B42625",
  border: "2px solid #000",
  boxShadow: 0,
  p: 4,
  backdropFilter: "blur(10px)",
  borderRadius: "2rem",
};

const backdropStyle = {
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

function Carrinho() {
  const [items, setItems] = useState(() => {
    const carrinhoLocal = localStorage.getItem("carrinho");
    return carrinhoLocal ? JSON.parse(carrinhoLocal) : [];
  });

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
    nome_cliente: "",
  });

  useEffect(() => {
    const fetchLanches = async () => {
      try {
        const allLanches = await getLanches();
        const updatedItems = items.map((item) => {
          const lancheDetalhado = allLanches.find((l) => l.id === item.id);
          if (lancheDetalhado) {
            return { ...lancheDetalhado, quantidade: item.quantidade };
          }
          return item;
        });
        setItems(updatedItems);
      } catch (error) {
        console.error("Erro ao buscar lanches:", error);
      }
    };
    fetchLanches();
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(items));
  }, [items]);

  const precoTotal = () => {
    return items
      .reduce((total, item) => {
        const subtotal = item.preco * item.quantidade;
        return total + subtotal;
      }, 0)
      .toFixed(2);
  };

  const adicionarItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantidade: item.quantidade + 1 };
      }
      return item;
    });
    setItems(updatedItems);
    Lanches.length = 0;
    Lanches.push(...updatedItems);
  };

  const removerItem = (id) => {
    const updatedItems = items
      .map((item) => {
        if (item.id === id) {
          if (item.quantidade > 1) {
            return { ...item, quantidade: item.quantidade - 1 };
          }
          return null;
        }
        return item;
      })
      .filter((item) => item !== null);
    setItems(updatedItems);
    Lanches.length = 0;
    Lanches.push(...updatedItems);
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
    if (checked1 || checked2) {
      setChecked1(false);
      setChecked2(false);
    }
  };

  const handleChange1 = () => {
    setChecked1((prev) => !prev);
    if (checked || checked2) {
      setChecked(false);
      setChecked2(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleClose = () => setOpen(false);

  const buscarEndereco = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        if (!response.data.erro) {
          setEndereco((prev) => ({
            ...prev,
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
          }));
        } else {
          console.error("CEP inválido.");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;

    if (name === "numero") {
      const apenasNumerosPositivos = /^\d*$/;
      if (!apenasNumerosPositivos.test(value)) {
        return;
      }
    }

    setEndereco((prev) => ({ ...prev, [name]: value }));

    if (name === "cep") {
      buscarEndereco(value.replace(/\D/g, ""));
    }
  };

  const isFormValid = () => {
    return (
      endereco.nome_cliente.trim() !== "" &&
      endereco.cep.trim() !== "" &&
      endereco.numero.trim() !== "" &&
      endereco.cidade.trim() !== "" &&
      endereco.rua.trim() !== "" &&
      endereco.bairro.trim() !== ""
    );
  };

  const isCepValid = async (cep) => {
    const cepRegex = /^[0-9]{8}$/; // Verifica se o CEP tem exatamente 8 dígitos numéricos
    if (!cepRegex.test(cep.replace(/\D/g, ""))) {
      return false;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return !response.data.erro; // Retorna true se o CEP for válido
    } catch (error) {
      console.error("Erro ao validar o CEP:", error);
      return false;
    }
  };

  const handleFinalizarCompra = async () => {
    try {
      // Cria o pedido
      const pedido = {
        tipo_pedido: "delivery",
        nome_cliente: endereco.nome_cliente || "Cliente",
        CEP: endereco.cep,
        Numero: endereco.numero,
        Complemento: endereco.complemento || "",
        Status: "em preparação",
        tipo_pagamento: checked ? "Pix" : checked1 ? "Cartão" : "Dinheiro",
        Total: precoTotal(),
      };

      const pedidoCriado = await postPedidos(pedido);

      // Cria os itens do pedido
      for (const item of items) {
        const itemPedido = {
          id_pedido: pedidoCriado.pedido.ID, // Conecta ao pedido criado
          id_item_do_cardapio: item.id,
          quantidade: item.quantidade,
          observacao: item.observacao || "",
        };
        await postItemPedido(itemPedido);
      }

      alert("Pedido realizado com sucesso!");
      localStorage.removeItem("carrinho");
      setItems([]);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Erro ao finalizar compra. Tente novamente.");
    }
  };

  const handleFinalizarPedidoDireto = async () => {
    try {
      // Cria o pedido
      const pedido = {
        tipo_pedido: "delivery",
        nome_cliente: endereco.nome_cliente || "Cliente",
        CEP: endereco.cep,
        Numero: endereco.numero,
        Complemento: endereco.complemento || "",
        Status: "em preparação",
        tipo_pagamento: "Dinheiro", // Define como pagamento em dinheiro por padrão
        Total: precoTotal(),
      };

      const pedidoCriado = await postPedidos(pedido);

      // Cria os itens do pedido
      for (const item of items) {
        const itemPedido = {
          id_pedido: pedidoCriado.pedido.ID, // Conecta ao pedido criado
          id_item_do_cardapio: item.id,
          quantidade: item.quantidade,
          observacao: item.observacao || "",
        };
        await postItemPedido(itemPedido);
      }

      alert("Pedido realizado com sucesso!");
      localStorage.removeItem("carrinho");
      setItems([]);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao finalizar pedido diretamente:", error);
      alert("Erro ao finalizar pedido. Tente novamente.");
    }
  };

  const handleProcessarPagamento = async () => {
    if (!isFormValid()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const cepValido = await isCepValid(endereco.cep);
    if (!cepValido) {
      alert("CEP inválido. Por favor, insira um CEP válido.");
      return;
    }

    try {
      if (!checked && !checked1 && !checked2) {
        alert("Selecione uma forma de pagamento!");
        return;
      }

      if (checked2) {
        // Caso a opção "Dinheiro" esteja selecionada, finalize o pedido diretamente
        await handleFinalizarPedidoDireto();
        return;
      }

      const dadosPagamento = {
        items: items.map((item) => ({
          id: item.id,
          quantidade: item.quantidade,
        })),
        total: parseFloat(precoTotal()),
        dados_cliente: {
          nome: endereco.nome_cliente,
          email: endereco.email || "cliente@exemplo.com",
          telefone: endereco.telefone || "999999999",
          ddd: endereco.ddd || "11",
          cep: endereco.cep,
          rua: endereco.rua,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          complemento: endereco.complemento,
        },
      };

      let response;
      if (checked) {
        // Pagamento via PIX
        response = await pagamentoPix(dadosPagamento);
        alert("Pagamento via PIX iniciado. Escaneie o QR Code.");
        window.open(
          response.sandbox_init_point || response.init_point,
          "_blank"
        );
      } else if (checked1) {
        // Pagamento via Cartão
        response = await pagamentoCartao(dadosPagamento);
        alert("Pagamento via Cartão iniciado. Redirecionando...");
        window.open(
          response.sandbox_init_point || response.init_point,
          "_blank"
        );
      }

      // Limpa o carrinho após o pagamento
      localStorage.removeItem("carrinho");
      setItems([]);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
    }
  };

  return (
    <div className="carrinho-container">
      <Navbar />
      <div className="carrinho-titulo">
        <img className="icon-carrinho" src={carrinho} alt="icon-carrinho" />
        <span className="titulo-carrinho">Carrinho</span>
      </div>
      <div className="carrinho_body">
        <div className="pedidos_container">
          {items.length === 0 ? (
            <div className="mensagem-vazia">
              <h2>Seu carrinho está vazio!</h2>
              <a href="/">Adicione itens deliciosos ao seu pedido e aproveite!</a>
            </div>
          ) : (
            <>
              {items.map((lanche, index) => (
                <div key={lanche.id} className="pedidos_lista">
                  <div className="corpo_pedido">
                    <img
                      src={lanche.imagem}
                      className="img_lanche"
                      alt={`produto0${index + 1}`}
                    />
                    <div className="food_text_carrinho">
                      <h1 className="nome_lanche_carrinho">{lanche.nome}</h1>
                      <p className="descricao_lanche_carrinho">
                        {lanche.descricao}
                      </p>
                    </div>
                  </div>
                  <div className="jogar-pro-ladinho">
                    <div className="preco-remover-carrinho">
                      <div className="preco-total-carrinho">
                        R$:{" "}
                        {lanche.preco
                          ? Number(lanche.preco).toFixed(2)
                          : "0.00"}
                        <div className="preco-quantidade">
                          Total: R${" "}
                          {(lanche.preco * lanche.quantidade).toFixed(2)}
                        </div>
                      </div>
                      <div className="botoes-acoes">
                        <button
                          className="button-add-pedido"
                          onClick={() => adicionarItem(lanche.id)}
                        >
                          +
                        </button>
                        <span className="quantidade-item">
                          {lanche.quantidade}
                        </span>
                        <button
                          className="button-remover-pedido"
                          onClick={() => removerItem(lanche.id)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="total-compra">
                <h2>Total: R$ {precoTotal()}</h2>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        {items.length > 0 && ( // Exibe o botão apenas se houver itens no carrinho
          <div className="finalizar-pedido">
            <button className="pedido-finalizado" onClick={handleOpen}>
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: backdropStyle,
        }}
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleClose}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1.8rem",
                cursor: "pointer",
                color: "#fff",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              ×
            </button>
          </div>
          <div className="modal-finalizar-pedido">
            <div className="container-tudo-modal">
              <div>
                <span className="titulo-endereco">Nome do Cliente</span>
                <input
                  type="text"
                  name="nome_cliente"
                  value={endereco.nome_cliente}
                  required
                  onChange={handleEnderecoChange}
                  className="input-modal"
                />
              </div>
              <div className="div-endereco">
              <div className="endereco">
                <span className="titulo-endereco">Endereço da Entrega</span>
                  <div className="linha-endereco">
                    <input
                      type="text"
                      className="input_switch input-switch-cep"
                      name="cep"
                      placeholder="CEP"
                      required
                      value={endereco.cep}
                      onChange={handleEnderecoChange}
                      maxLength={8}
                    />
                    <input
                      type="text"
                      className="input_switch input-switch-cidade"
                      name="cidade"
                      placeholder="Cidade"
                      value={endereco.cidade}
                      readOnly // Define como somente leitura
                    />
                  </div>
                  <div className="linha-endereco">
                    <input
                      type="text"
                      className="input_switch input-switch-rua"
                      name="rua"
                      placeholder="Rua"
                      value={endereco.rua}
                      readOnly // Define como somente leitura
                    />
                    <input
                      type="text"
                      className="input_switch input-switch-numero"
                      name="numero"
                      placeholder="Número"
                      required // Define como obrigatório
                      value={endereco.numero}
                      onChange={handleEnderecoChange}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                  <div className="linha-endereco">
                    <input
                      type="text"
                      className="input_switch input-switch-bairro"
                      name="bairro"
                      placeholder="Bairro"
                      value={endereco.bairro}
                      readOnly // Define como somente leitura
                    />
                    <input
                      type="text"
                      className="input_switch input-switch-complemento"
                      name="complemento"
                      placeholder="Complemento (Opcional)"
                      value={endereco.complemento}
                      onChange={handleEnderecoChange}
                    />
                  </div>
                </div>
                <div>
                  <span className="titulo-endereco">Forma de Pagamento</span>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="pagamento"
                        checked={checked}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      PIX
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="pagamento"
                        checked={checked1}
                        onChange={handleChange1}
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      Cartão
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="pagamento"
                        checked={checked2}
                        onChange={() => {
                          setChecked(false);
                          setChecked1(false);
                          setChecked2(true);
                        }}
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      Dinheiro
                    </label>
                  </div>
                </div>
                <button
                  className="finalizar-compra"
                  onClick={handleProcessarPagamento}
                >
                  Confirmar Pagamento
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Carrinho;

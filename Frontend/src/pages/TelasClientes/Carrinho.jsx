import "../TelasClientesCss/Carrinho.css";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import carrinho from "../../assets/cardapio/shopping-cart.svg";
import { FormControlLabel, Switch, Grow } from "@mui/material";
import piximg from "../../assets/carrinho/piximg.jpg";
import masterimg from "../../assets/carrinho/masterimg.jpg";
import { Lanches } from "./Cardapio";
import { getLanches, deleteItemPedido } from "../../Services/api";
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

const stylePayment = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80%",
  width: "60%",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 0,
  p: 4,
  backdropFilter: "blur(10px)",
  borderRadius: "2rem",
  overflow: "auto",
};

function Carrinho() {
  const [items, setItems] = useState(() => {
    const carrinhoLocal = localStorage.getItem("carrinho");
    return carrinhoLocal ? JSON.parse(carrinhoLocal) : [];
  });

  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: endereco, 2: pagamento
  const [paymentData, setPaymentData] = useState({
    email: "",
    nome: "",
    sobrenome: "",
    cpf: "",
  });
  const [pixData, setPixData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
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

  // Adicionar script do MercadoPago
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
    if (checked1) setChecked1(false);
  };

  const handleChange1 = () => {
    setChecked1((prev) => !prev);
    if (checked) setChecked(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentStep(1);
    setPaymentMethod("");
    setPixData(null);
    setPaymentStatus("");
  };

  const handleOpenPayment = () => setOpenPayment(true);
  const handleClosePayment = () => setOpenPayment(false);

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

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      // Remove caracteres não numéricos
      const apenasNumeros = value.replace(/\D/g, "");
      setPaymentData((prev) => ({ ...prev, [name]: apenasNumeros }));
    } else {
      setPaymentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validar endereço
      if (
        !endereco.cep ||
        !endereco.rua ||
        !endereco.numero ||
        !endereco.bairro ||
        !endereco.cidade
      ) {
        alert("Por favor, preencha todos os campos obrigatórios do endereço.");
        return;
      }
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
    setPaymentMethod("");
    setPixData(null);
    setPaymentStatus("");
  };

  const processarPagamentoPix = async () => {
    try {
      // Validar dados
      if (
        !paymentData.email ||
        !paymentData.nome ||
        !paymentData.sobrenome ||
        !paymentData.cpf
      ) {
        alert("Por favor, preencha todos os dados pessoais.");
        return;
      }

      if (paymentData.cpf.length !== 11) {
        alert("CPF deve ter 11 dígitos.");
        return;
      }

      setPaymentStatus("Processando pagamento...");

      const response = await axios.post(
        "http://localhost:3001/api/pagamento/pix",
        {
          valor: parseFloat(precoTotal()),
          email: paymentData.email,
          cpf: paymentData.cpf,
          nome: paymentData.nome,
          sobrenome: paymentData.sobrenome,
        }
      );

      setPixData(response.data);
      setPaymentStatus("QR Code gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao processar pagamento PIX:", error);
      setPaymentStatus("Erro ao processar pagamento. Tente novamente.");
    }
  };

  const processarPagamentoCartao = async () => {
    try {
      // Validar dados
      if (
        !paymentData.email ||
        !paymentData.nome ||
        !paymentData.sobrenome ||
        !paymentData.cpf
      ) {
        alert("Por favor, preencha todos os dados pessoais.");
        return;
      }

      if (paymentData.cpf.length !== 11) {
        alert("CPF deve ter 11 dígitos.");
        return;
      }

      setPaymentStatus("Carregando formulário de cartão...");

      // Abrir modal do MercadoPago para cartão
      const mp = new window.MercadoPago("YOUR_PUBLIC_KEY"); // Substitua pela sua chave pública

      const cardForm = mp.cardForm({
        amount: parseFloat(precoTotal()).toString(),
        autoMount: true,
        form: {
          id: "form-checkout",
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular do cartão",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
          },
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número do cartão",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YY",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de segurança",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número do documento",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emissor",
          },
        },
        callbacks: {
          onFormMounted: (error) => {
            if (error) {
              console.warn(
                "Callback handling the response of the form mounted: ",
                error
              );
            }
            console.log("Form mounted");
          },
          onSubmit: (event) => {
            event.preventDefault();

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            // Fazer chamada para o backend
            axios
              .post("http://localhost:3001/api/pagamento/cartao", {
                token,
                valor: parseFloat(amount),
                email: paymentData.email,
                nome: paymentData.nome,
                sobrenome: paymentData.sobrenome,
                cpf: paymentData.cpf,
                parcelas: installments,
                payment_method_id,
                issuer_id,
              })
              .then((response) => {
                console.log("Pagamento processado:", response.data);
                setPaymentStatus(`Pagamento ${response.data.status}!`);
                if (response.data.status === "approved") {
                  // Criar pedido, limpar carrinho, etc.
                  finalizarPedido();
                }
              })
              .catch((error) => {
                console.error("Erro no pagamento:", error);
                setPaymentStatus("Erro ao processar pagamento.");
              });
          },
          onFetching: (resource) => {
            console.log("Fetching resource: ", resource);
          },
        },
      });

      setPaymentStatus("Formulário de cartão carregado!");
    } catch (error) {
      console.error("Erro ao processar pagamento com cartão:", error);
      setPaymentStatus("Erro ao carregar formulário de cartão.");
    }
  };

  const finalizarPedido = async () => {
    try {
      // Criar pedido no backend
      const pedidoData = {
        tipo_pedido: "delivery",
        nome_cliente: `${paymentData.nome} ${paymentData.sobrenome}`,
        CEP: endereco.cep,
        Numero: parseInt(endereco.numero),
        Complemento: endereco.complemento,
        Status: "em preparação",
        tipo_pagamento: paymentMethod === "pix" ? "PIX" : "Cartão",
        Total: parseFloat(precoTotal()),
      };

      const pedidoResponse = await axios.post(
        "http://localhost:3001/api/pedidos",
        pedidoData
      );
      const pedidoId = pedidoResponse.data.ID;

      // Adicionar itens ao pedido
      for (const item of items) {
        await axios.post("http://localhost:3001/api/itempedido", {
          id_pedido: pedidoId,
          id_item_do_cardapio: item.id,
          quantidade: item.quantidade,
          observacao: "",
        });
      }

      // Limpar carrinho
      setItems([]);
      localStorage.removeItem("carrinho");

      alert("Pedido finalizado com sucesso!");
      handleClose();
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert("Erro ao finalizar pedido. Tente novamente.");
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
              <p>Adicione itens deliciosos ao seu pedido e aproveite!</p>
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
        <div className="finalizar-pedido">
          <button className="pedido-finalizado" onClick={handleOpen}>
            Finalizar Pedido
          </button>
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
                {currentStep === 1 && (
                  <div className="div-endereco">
                    <span className="titulo-endereco">Endereço da Entrega</span>
                    <div className="endereco">
                      <div className="linha-endereco">
                        <input
                          type="text"
                          className="input_switch input-switch-cep"
                          name="cep"
                          placeholder="CEP"
                          required
                          value={endereco.cep}
                          onChange={handleEnderecoChange}
                          maxLength={9}
                        />
                        <input
                          type="text"
                          className="input_switch input-switch-cidade"
                          name="cidade"
                          placeholder="Cidade"
                          required
                          value={endereco.cidade}
                          onChange={handleEnderecoChange}
                        />
                      </div>
                      <div className="linha-endereco">
                        <input
                          type="text"
                          className="input_switch input-switch-rua"
                          name="rua"
                          placeholder="Rua"
                          required
                          value={endereco.rua}
                          onChange={handleEnderecoChange}
                        />
                        <input
                          type="text"
                          className="input_switch input-switch-numero"
                          name="numero"
                          placeholder="Número"
                          required
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
                          required
                          value={endereco.bairro}
                          onChange={handleEnderecoChange}
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
                    <button className="finalizar-compra" onClick={nextStep}>
                      Próxima Etapa
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="div-pagamento">
                    <span
                      className="titulo-pagamento"
                      style={{
                        color: "#fff",
                        fontSize: "1.5rem",
                        marginBottom: "1rem",
                        display: "block",
                      }}
                    >
                      Forma de Pagamento - Total: R$ {precoTotal()}
                    </span>

                    <div
                      className="dados-pessoais"
                      style={{ marginBottom: "1.5rem" }}
                    >
                      <h3 style={{ color: "#fff", marginBottom: "1rem" }}>
                        Dados Pessoais
                      </h3>
                      <div className="linha-endereco">
                        <input
                          type="email"
                          className="input_switch"
                          name="email"
                          placeholder="E-mail"
                          required
                          value={paymentData.email}
                          onChange={handlePaymentDataChange}
                        />
                        <input
                          type="text"
                          className="input_switch"
                          name="cpf"
                          placeholder="CPF (apenas números)"
                          required
                          value={paymentData.cpf}
                          onChange={handlePaymentDataChange}
                          maxLength={11}
                        />
                      </div>
                      <div className="linha-endereco">
                        <input
                          type="text"
                          className="input_switch"
                          name="nome"
                          placeholder="Nome"
                          required
                          value={paymentData.nome}
                          onChange={handlePaymentDataChange}
                        />
                        <input
                          type="text"
                          className="input_switch"
                          name="sobrenome"
                          placeholder="Sobrenome"
                          required
                          value={paymentData.sobrenome}
                          onChange={handlePaymentDataChange}
                        />
                      </div>
                    </div>

                    <div
                      className="metodos-pagamento"
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <button
                        onClick={() => {
                          setPaymentMethod("pix");
                          processarPagamentoPix();
                        }}
                        style={{
                          background:
                            paymentMethod === "pix" ? "#4CAF50" : "#fff",
                          color: paymentMethod === "pix" ? "#fff" : "#000",
                          border: "2px solid #4CAF50",
                          padding: "1rem 2rem",
                          borderRadius: "1rem",
                          cursor: "pointer",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <img
                          src={piximg}
                          alt="PIX"
                          style={{ width: "30px", height: "30px" }}
                        />
                        Pagar com PIX
                      </button>
                      <button
                        onClick={() => {
                          setPaymentMethod("cartao");
                          processarPagamentoCartao();
                        }}
                        style={{
                          background:
                            paymentMethod === "cartao" ? "#FF6B35" : "#fff",
                          color: paymentMethod === "cartao" ? "#fff" : "#000",
                          border: "2px solid #FF6B35",
                          padding: "1rem 2rem",
                          borderRadius: "1rem",
                          cursor: "pointer",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <img
                          src={masterimg}
                          alt="Cartão"
                          style={{ width: "30px", height: "30px" }}
                        />
                        Pagar com Cartão
                      </button>
                    </div>

                    {paymentStatus && (
                      <div
                        style={{
                          color: "#fff",
                          marginBottom: "1rem",
                          textAlign: "center",
                        }}
                      >
                        {paymentStatus}
                      </div>
                    )}

                    {pixData && (
                      <div
                        className="pix-payment"
                        style={{ textAlign: "center", color: "#fff" }}
                      >
                        <h3>Escaneie o QR Code para pagar</h3>
                        <img
                          src={`data:image/png;base64,${pixData.qr_code_base64}`}
                          alt="QR Code PIX"
                          style={{
                            maxWidth: "200px",
                            margin: "1rem auto",
                            display: "block",
                          }}
                        />
                        <p>Ou copie o código PIX:</p>
                        <textarea
                          value={pixData.qr_code_text}
                          readOnly
                          style={{
                            width: "100%",
                            height: "100px",
                            resize: "none",
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <button
                          onClick={finalizarPedido}
                          style={{
                            background: "#4CAF50",
                            color: "#fff",
                            border: "none",
                            padding: "1rem 2rem",
                            borderRadius: "1rem",
                            cursor: "pointer",
                            fontWeight: "bold",
                            marginTop: "1rem",
                          }}
                        >
                          Confirmar Pagamento
                        </button>
                      </div>
                    )}

                    {paymentMethod === "cartao" && (
                      <div
                        id="form-checkout"
                        style={{
                          color: "#000",
                          background: "#fff",
                          padding: "1rem",
                          borderRadius: "1rem",
                        }}
                      >
                        <div
                          id="form-checkout__cardNumber"
                          className="container"
                        ></div>
                        <div
                          id="form-checkout__expirationDate"
                          className="container"
                        ></div>
                        <div
                          id="form-checkout__securityCode"
                          className="container"
                        ></div>
                        <input type="text" id="form-checkout__cardholderName" />
                        <input
                          type="email"
                          id="form-checkout__cardholderEmail"
                        />
                        <select id="form-checkout__issuer"></select>
                        <select id="form-checkout__installments"></select>
                        <select id="form-checkout__identificationType"></select>
                        <input
                          type="text"
                          id="form-checkout__identificationNumber"
                        />
                        <button type="submit" id="form-checkout__submit">
                          Pagar
                        </button>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      <button
                        className="finalizar-compra"
                        onClick={prevStep}
                        style={{ background: "#6c757d" }}
                      >
                        Voltar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Carrinho;

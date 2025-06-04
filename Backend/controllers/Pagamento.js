import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import dotenv from "dotenv";
import ItemCardapio from "../models/ItemCardapio.js";
import ItemPedido from "../models/ItemPedido.js";
import Pedidos from "../models/Pedidos.js";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  options: { timeout: 5000 },
});

// Função para criar preferência de pagamento PIX
export const pagamentoPix = async (req, res) => {
  try {
    const { items, total, pedido_id, dados_cliente } = req.body;

    // Validação dos dados recebidos
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items são obrigatórios" });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: "Total deve ser maior que zero" });
    }

    // Buscar detalhes dos itens no banco de dados
    const itemsCompletos = await Promise.all(
      items.map(async (item) => {
        const itemCardapio = await ItemCardapio.findByPk(item.id);
        if (!itemCardapio) {
          throw new Error(`Item com ID ${item.id} não encontrado`);
        }
        return {
          id: itemCardapio.id.toString(),
          title: itemCardapio.nome,
          quantity: item.quantidade,
          currency_id: 'BRL',
          unit_price: parseFloat(itemCardapio.preco),
          description: itemCardapio.descricao,
        };
      })
    );

    const preference = new Preference(client);

    const body = {
      items: itemsCompletos,
      payer: {
        name: dados_cliente?.nome || "Cliente",
        email: dados_cliente?.email || "cliente@exemplo.com",
        phone: {
          area_code: dados_cliente?.ddd || "11",
          number: dados_cliente?.telefone || "999999999"
        },
        address: {
          street_name: dados_cliente?.rua || "",
          street_number: parseInt(dados_cliente?.numero) || 0,
          zip_code: dados_cliente?.cep?.replace(/\D/g, "") || ""
        }
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/compracerta`, // URL válida para sucesso
        failure: `${process.env.FRONTEND_URL}/compraerrada`, // URL válida para falha
        pending: `${process.env.FRONTEND_URL}/compraerrada`, // URL válida para pendente
      },
      auto_return: "approved", // Define auto_return como "approved"
      payment_methods: {
        excluded_payment_types: [
          { id: "credit_card" },
          { id: "debit_card" },
          { id: "ticket" }
        ],
        installments: 1
      },
      external_reference: pedido_id?.toString() || null,
      notification_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/webhook/mercadopago`, // URL para notificações
    };

    const response = await preference.create({ body });

    // Atualizar o status do pedido se pedido_id foi fornecido
    if (pedido_id) {
      await Pedidos.update(
        { Status: "aguardando pagamento" },
        { where: { ID: pedido_id } }
      );
    }

    res.json({
      success: true,
      preference_id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
      qr_code: response.qr_code,
      qr_code_base64: response.qr_code_base64,
    });

  } catch (error) {
    console.error("Erro ao criar preferência PIX:", error);
    res.status(500).json({ 
      error: "Erro ao processar pagamento PIX",
      details: error.message 
    });
  }
};

// Função para criar preferência de pagamento com cartão
export const pagamentoCartao = async (req, res) => {
  try {
    const { items, total, pedido_id, dados_cliente, installments = 1 } = req.body;

    // Validação dos dados recebidos
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items são obrigatórios" });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: "Total deve ser maior que zero" });
    }

    // Buscar detalhes dos itens no banco de dados
    const itemsCompletos = await Promise.all(
      items.map(async (item) => {
        const itemCardapio = await ItemCardapio.findByPk(item.id);
        if (!itemCardapio) {
          throw new Error(`Item com ID ${item.id} não encontrado`);
        }
        return {
          id: itemCardapio.id.toString(),
          title: itemCardapio.nome,
          quantity: item.quantidade,
          currency_id: 'BRL',
          unit_price: parseFloat(itemCardapio.preco),
          description: itemCardapio.descricao,
        };
      })
    );

    const preference = new Preference(client);

    const body = {
      items: itemsCompletos,
      payer: {
        name: dados_cliente?.nome || "Cliente",
        email: dados_cliente?.email || "cliente@exemplo.com",
        phone: {
          area_code: dados_cliente?.ddd || "11",
          number: dados_cliente?.telefone || "999999999"
        },
        address: {
          street_name: dados_cliente?.rua || "",
          street_number: parseInt(dados_cliente?.numero) || 0,
          zip_code: dados_cliente?.cep?.replace(/\D/g, "") || ""
        }
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/compracerta`, // URL válida para sucesso
        failure: `${process.env.FRONTEND_URL}/compraerrada`, // URL válida para falha
        pending: `${process.env.FRONTEND_URL}/compraerrada`, // URL válida para pendente
      },
      auto_return: "approved", // Define auto_return como "approved"
      payment_methods: {
        excluded_payment_types: [
          { id: "pix" },
          { id: "ticket" }
        ],
        installments: installments
      },
      external_reference: pedido_id?.toString() || null,
      notification_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/webhook/mercadopago`, // URL para notificações
    };

    const response = await preference.create({ body });

    // Atualizar o status do pedido se pedido_id foi fornecido
    if (pedido_id) {
      await Pedidos.update(
        { Status: "aguardando pagamento" },
        { where: { ID: pedido_id } }
      );
    }

    res.json({
      success: true,
      preference_id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });

  } catch (error) {
    console.error("Erro ao criar preferência Cartão:", error);
    res.status(500).json({ 
      error: "Erro ao processar pagamento com cartão",
      details: error.message 
    });
  }
};

// Webhook para receber notificações do Mercado Pago
export const webhookMercadoPago = async (req, res) => {
  try {
    const { action, data } = req.body;

    if (action === "payment.created" || action === "payment.updated") {
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: data.id });

      // Buscar o pedido pelo external_reference
      if (paymentInfo.external_reference) {
        const pedido = await Pedidos.findByPk(paymentInfo.external_reference);
        
        if (pedido) {
          let novoStatus = "em preparação";
          
          switch (paymentInfo.status) {
            case "approved":
              novoStatus = "em preparação";
              break;
            case "pending":
              novoStatus = "aguardando pagamento";
              break;
            case "rejected":
            case "cancelled":
              novoStatus = "cancelado";
              break;
            default:
              novoStatus = "aguardando pagamento";
          }

          await pedido.update({ Status: novoStatus });
          console.log(`Pedido ${pedido.ID} atualizado para status: ${novoStatus}`);
        }
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    res.status(500).json({ error: "Erro no webhook" });
  }
};

export const verificarStatusPagamento = async (req, res) => {
  try {
    const { payment_id } = req.params;

    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: payment_id });

    res.json({
      status: paymentInfo.status,
      status_detail: paymentInfo.status_detail,
      payment_method: paymentInfo.payment_method_id,
      transaction_amount: paymentInfo.transaction_amount,
      date_created: paymentInfo.date_created,
      date_approved: paymentInfo.date_approved,
    });

  } catch (error) {
    console.error("Erro ao verificar status do pagamento:", error);
    res.status(500).json({ error: "Erro ao verificar pagamento" });
  }
};
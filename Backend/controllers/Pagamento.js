import { MercadoPagoConfig, Payment } from "mercadopago";
import dotenv from "dotenv";
dotenv.config();


const client = new MercadoPagoConfig({
  accessToken: process.env.PAYMENT_API_KEY,
});
const payment = new Payment(client);



export const pagamentoPix = async (req, res) => {
  try {
    const {valor, email, cpf, nome, sobrenome} = req.body;

    const payment_data = {
      transaction_amount: valor,
      description: "Pedido do Sanctus Panis Foodtruck",
      payment_method_id: "pix",
      payer: {
        email: email,
        first_name: nome,
        last_name: sobrenome,
        identification: {
          type: "CPF",
          number: cpf,
        },
      },
    };

    const response = await payment.create({ body: payment_data });
    const qrCodeBase64 = response.body.point_of_interaction.transaction_data.qr_code_base64;
    const qrCodeText = response.body.point_of_interaction.transaction_data.qr_code;

    return {
      id: response.body.id,
      status: response.body.status,
      qr_code_base64: qrCodeBase64,
      qr_code_text: qrCodeText,
    };
  } catch (error) {
    console.error("Erro ao criar pagamento PIX:", error);
    throw error;
  }
};

export const pagamentoCartao = async (req, res) => {
  try {
    const { token, valor, email, nome, sobrenome, cpf, parcelas, payment_method_id, issuer_id } = req.body;

    const payment_data = {
      transaction_amount: valor,
      token: token,
      description: "Pedido Sanctus Panis Foodtruck",
      installments: parcelas,
      payment_method_id: payment_method_id,
      issuer_id: issuer_id,
      payer: {
        email: email,
        first_name: nome,
        last_name: sobrenome,
        identification: {
          type: "CPF",
          number: cpf
        }
      }
    };

    const response = await payment.create({ body: payment_data });
    res.json({
      id: response.body.id,
      status: response.body.status,
      status_detail: response.body.status_detail
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

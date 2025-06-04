import React from "react";
import { useNavigate } from "react-router-dom";

function CompraCerta() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Pagamento aprovado!</h1>
      <p>Obrigado por sua compra. Seu pedido está sendo processado.</p>
      <button onClick={() => navigate("/")} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Voltar ao início
      </button>
    </div>
  );
}

export default CompraCerta;

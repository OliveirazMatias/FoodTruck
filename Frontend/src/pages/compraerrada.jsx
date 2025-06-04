import React from "react";
import { useNavigate } from "react-router-dom";

function CompraErrada() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Pagamento não aprovado!</h1>
      <p>Ocorreu um problema com seu pagamento. Tente novamente.</p>
      <button onClick={() => navigate("/carrinho")} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Voltar ao carrinho
      </button>
    </div>
  );
}

export default CompraErrada;

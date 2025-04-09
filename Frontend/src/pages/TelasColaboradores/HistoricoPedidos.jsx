
import React, { useState } from "react";
import '../TelasColaboradoresCss/HistoricoPedidos.css';
import lanche1 from '../../assets/historico/lanche1.png'; 

const HistoricoPedidos = () => {
  const [filtro, setFiltro] = useState("");
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState("");

  const pedidos = [
    {
      mesa: 2,
      data: "05/03/2025 - 19:30",
      valor: "R$ 50,00",
      pagamento: "Dinheiro",
      consumo: "Consumo no local",
      itens: [
        { nome: "3 X-Frango" },
        { nome: "2 X-Burguer"},
      ],
    },
  ];

  const FiltroClick = (tipo) => {
    setFiltro(tipo);
    setMostrarPedidos(true);
  };

  return (
    <div className="historico-container">
      <h1 className="titulo">HISTÓRICO DE PEDIDOS</h1>  
      <div className="filtro-container">
        <button 
          className={filtro === "Hoje" ? "ativo" : ""} 
          onClick={() => FiltroClick("Hoje")}
        >
          Hoje
        </button>
        <button 
          className={filtro === "Últimos 7 dias" ? "ativo" : ""} 
          onClick={() => FiltroClick("Últimos 7 dias")}
        >
          Últimos 7 dias
        </button>
        <button 
          className={filtro === "Mês atual" ? "ativo" : ""} 
          onClick={() => FiltroClick("Mês atual")}
        >
          Mês atual
        </button>
        <input
          type="date"
          className={filtro === "Data" ? "ativo" : ""}
          onChange={(e) => {
            setDataSelecionada(e.target.value);
            FiltroClick("Data");
          }}
        />
      </div>

      {mostrarPedidos && (
        
        <div className="pedido-container">
          <p>NÚMERO DE PEDIDOS: 36</p>
          <p>VALOR TOTAL: R$ 720,00</p>
          {pedidos.map((pedido, index) => (
            <div key={index} className="pedido-card">
              <h2>PEDIDO MESA {pedido.mesa}</h2>
              <div className="itens">
                {pedido.itens.map((item, idx) => (
                  <div key={idx} className="item">
                    <span>{item.nome}</span>
                  </div>
                ))}
              </div>
              <p>DATA E HORA: {pedido.data}</p>
              <p>VALOR TOTAL: {pedido.valor}</p>
              <p>FORMA DE PAGAMENTO: {pedido.pagamento}</p>
              <p className="consumo">{pedido.consumo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoPedidos;

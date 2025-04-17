import React, { useState } from "react";
import '../TelasColaboradoresCss/HistoricoPedidos.css';
import { getPedidosByDate } from '../../Services/api';

const HistoricoPedidos = () => {
  const [filtro, setFiltro] = useState("");
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [numeroPedidos, setNumeroPedidos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const FiltroClick = async (tipo) => {
    setFiltro(tipo);
    setMostrarPedidos(false);

    let filtroApi = "";
    let dataApi = null;

    if (tipo === "Hoje") {
      filtroApi = "hoje";
    } else if (tipo === "Últimos 7 dias") {
      filtroApi = "semana";
    } else if (tipo === "Mês atual") {
      filtroApi = "mes";
    } else if (tipo === "Data" && dataSelecionada) {
      filtroApi = "data_especifica";
      dataApi = dataSelecionada;
    }

    try {
      const response = await getPedidosByDate(filtroApi, dataApi);
      const pedidosFiltrados = response.pedidos || [];
      setPedidos(pedidosFiltrados);

      // Calcula o número de pedidos e o valor total
      setNumeroPedidos(pedidosFiltrados.length);
      const total = pedidosFiltrados.reduce((acc, pedido) => acc + parseFloat(pedido.Total || 0), 0);
      setValorTotal(total);

      setMostrarPedidos(true);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
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
          <p>NÚMERO DE PEDIDOS: {numeroPedidos}</p>
          <p>VALOR TOTAL: R$ {valorTotal.toFixed(2)}</p>
          {pedidos.map((pedido, index) => (
            <div key={index} className="pedido-card">
              <h2>PEDIDO MESA {pedido.Mesa || "N/A"}</h2>
              <div className="itens">
                {pedido.itens?.map((item, idx) => (
                  <div key={idx} className="item">
                    <span>{item.nome}</span>
                  </div>
                )) || <p>Sem itens registrados</p>}
              </div>
              <p>DATA E HORA: {pedido.data_criacao}</p>
              <p>VALOR TOTAL: R$ {parseFloat(pedido.Total || 0).toFixed(2)}</p>
              <p>FORMA DE PAGAMENTO: {pedido.tipo_pagamento}</p>
              <p className="consumo">{pedido.tipo_pedido}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoPedidos;

import React, { useState, useEffect } from "react";
import '../TelasColaboradoresCss/HistoricoPedidos.css';
import { getPedidosByDate, getLanches } from '../../Services/api';

const HistoricoPedidos = () => {
  const [filtro, setFiltro] = useState("");
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [numeroPedidos, setNumeroPedidos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [lanches, setLanches] = useState({}); // Estado para armazenar os lanches

  useEffect(() => {
    const fetchLanches = async () => {
      try {
        const response = await getLanches();
        const lanchesMap = {};
        response.forEach((lanche) => {
          lanchesMap[lanche.id] = lanche.nome; // Mapeia o ID do lanche para o nome
        });
        setLanches(lanchesMap);
      } catch (error) {
        console.error("Erro ao buscar lanches:", error);
      }
    };

    fetchLanches();
  }, []);

  const FiltroClick = async (tipo, data = null) => {
    setFiltro(tipo);
    setMostrarPedidos(false);

    let filtroApi = tipo.toLowerCase();
    let dataApi = data;

    try {
      console.log("Filtro enviado:", filtroApi, "Data enviada:", dataApi); // Log para depuração
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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    console.log("Data selecionada:", selectedDate); // Log para verificar o valor capturado
    if (selectedDate) {
      setDataSelecionada(selectedDate);
      FiltroClick("data_especifica", selectedDate);
    }
  };

  return (
    <div className="historico-container">
      <h1 className="titulo">HISTÓRICO DE PEDIDOS</h1>  
      <div className="filtro-container">
        <button 
          className={filtro === "Hoje" ? "ativo" : ""} 
          onClick={() => FiltroClick("hoje")}
        >
          Hoje
        </button>
        <button 
          className={filtro === "Últimos 7 dias" ? "ativo" : ""} 
          onClick={() => FiltroClick("semana")}
        >
          Últimos 7 dias
        </button>
        <button 
          className={filtro === "Mês atual" ? "ativo" : ""} 
          onClick={() => FiltroClick("mes")}
        >
          Mês atual
        </button>
        <input
          type="date"
          className={filtro === "Data" ? "ativo" : ""}
          onChange={handleDateChange} // Usa a função handleDateChange
        />
      </div>

      {mostrarPedidos && (
        <div className="pedido-container">
          <p>NÚMERO DE PEDIDOS: {numeroPedidos}</p>
          <p>VALOR TOTAL: R$ {valorTotal.toFixed(2)}</p>
          {pedidos.map((pedido, index) => (
            <div key={index} className="pedido-card">
              <h2>
                {pedido.tipo_pedido === "delivery" ? "PEDIDO CEP:" : "PEDIDO MESA:"} {pedido.tipo_pedido === "delivery" ? pedido.CEP : pedido.Mesa || "N/A"}
              </h2>
              <div className="itens">
                {pedido.itens?.map((item, idx) => (
                  <div key={idx} className="item">
                    <span>
                      {lanches[item.id_item_do_cardapio] || `Item ${item.id_item_do_cardapio}`} {item.quantidade}x
                    </span>
                  </div>
                )) || <p>Sem itens registrados</p>}
              </div>
              <p>CLIENTE: {pedido.nome_cliente?.toUpperCase()}</p>
              <p>DATA E HORA: {pedido.data_criacao}</p>
              <p>VALOR TOTAL: R$ {parseFloat(pedido.Total || 0).toFixed(2)}</p>
              <p>FORMA DE PAGAMENTO: {pedido.tipo_pagamento}</p>
              <p className="consumo">{pedido.tipo_pedido === "delivery" ? "DELIVERY" : "NO LOCAL" }</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoPedidos;

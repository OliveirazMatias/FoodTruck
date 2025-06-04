import '../TelasColaboradoresCss/Comandas.css';
import { useState, useEffect } from "react";
import { getLanches, getPedidos } from "../../Services/api"; // Importa o novo método
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Navbar from '../../components/NavBar/navbar.jsx';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: '#141c1e', // Fundo do modal
    color: '#ffffff', // Garante que o texto seja visível
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto'
};

function Comandas() {
    const [comandas, setComandas] = useState(() => {
        const saved = localStorage.getItem('comandas');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return {};
            }
        }
        return {};
    });

    const [lanches, setLanches] = useState({});
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [activeFilter, setActiveFilter] = useState('tudo');

    const [pedidosDelivery, setPedidosDelivery] = useState([]);  // estado pra delivery
    const [pedidos, setPedidos] = useState([]); // Estado para armazenar todos os pedidos
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null); // Estado para o pedido selecionado
    const [pedidoDeliverySelecionado, setPedidoDeliverySelecionado] = useState(null); // Estado para o pedido de delivery selecionado
    const [modalDeliveryAberto, setModalDeliveryAberto] = useState(false); // Estado para o segundo modal

    useEffect(() => {
        const comandasFiltradas = {};
        Object.keys(comandas).forEach(mesa => {
            comandasFiltradas[mesa] = comandas[mesa].filter(item => item.quantidade > 0);
        });
        localStorage.setItem('comandas', JSON.stringify(comandasFiltradas));
    }, [comandas]);

    useEffect(() => {
        const fetchLanches = async () => {
            try {
                const dados = await getLanches();
                const lanchesMap = dados.reduce((map, lanche) => {
                    map[lanche.id] = lanche; // Map lanches by id
                    return map;
                }, {});

                setLanches(lanchesMap); // Store lanches as a map
            } catch (error) {
                console.error("Erro ao buscar lanches:", error);
            }
        };

        const fetchPedidosDelivery = async () => {
            try {
                console.log("Buscando pedidos delivery..."); // Log de início
                const response = await axios.get('/pedidos/delivery'); // Certifique-se de que o endpoint está correto
                const pedidos = response.data?.pedidos || []; // Fallback para lista vazia
                console.log("Pedidos delivery recebidos:", pedidos); // Log dos pedidos recebidos
                setPedidosDelivery(pedidos);
            } catch (error) {
                console.error('Erro ao buscar pedidos delivery:', error.response?.data || error.message);
                setPedidosDelivery([]);
            }
        };

        const fetchPedidos = async () => {
            try {
                console.log("Buscando todos os pedidos..."); // Log de início
                const response = await getPedidos();
                const pedidosFiltrados = response.pedidos?.filter(pedido => pedido.tipo_pedido === "delivery") || [];
                console.log("Pedidos filtrados (delivery):", pedidosFiltrados); // Log dos pedidos filtrados
                setPedidos(pedidosFiltrados);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error.response?.data || error.message);
            }
        };

        fetchLanches();
        fetchPedidosDelivery();
        fetchPedidos();
    }, []);

    const abrirComanda = (mesa) => {
        setMesaSelecionada(mesa);
        setActiveFilter('tudo');
        setModalAberto(true);
    };

    const fecharComanda = () => {
        setMesaSelecionada(null);
        setModalAberto(false);
    };

    const abrirPedido = (pedido) => {
        setPedidoSelecionado(pedido);
        setModalAberto(true);
    };

    const fecharPedido = () => {
        setPedidoSelecionado(null);
        setModalAberto(false);
    };

    const abrirPedidoDelivery = (pedido) => {
        setPedidoDeliverySelecionado(pedido);
        setModalAberto(true);
    };

    const fecharPedidoDelivery = () => {
        setPedidoDeliverySelecionado(null);
        setModalAberto(false);
    };

    const abrirModalPedido = (pedido) => {
        setPedidoSelecionado(pedido);
        setModalAberto(true);
    };

    const fecharModalPedido = () => {
        setPedidoSelecionado(null);
        setModalAberto(false);
    };

    const abrirSegundoModal = (pedido) => {
        if (pedido) {
            setPedidoDeliverySelecionado(pedido);
            setModalDeliveryAberto(true);
        } else {
            console.error("Pedido inválido:", pedido);
        }
    };

    const fecharSegundoModal = () => {
        setPedidoDeliverySelecionado(null);
        setModalDeliveryAberto(false);
    };

    const handleFilterClick = (tipo) => {
        setActiveFilter(tipo);
    };

    const adicionarItem = (id) => {
        const atualizada = comandas[mesaSelecionada].map(item =>
            item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
        setComandas(prev => ({ ...prev, [mesaSelecionada]: atualizada }));
    };

    const removerItem = (id) => {
        const atualizada = comandas[mesaSelecionada].map(item =>
            item.id === id && item.quantidade > 0 ? { ...item, quantidade: item.quantidade - 1 } : item
        );
        setComandas(prev => ({ ...prev, [mesaSelecionada]: atualizada }));
    };

    const precoTotal = () => {
        return comandas[mesaSelecionada]?.reduce((total, item) => {
            return total + item.quantidade * item.preco;
        }, 0).toFixed(2);
    };

    const marcarComoConcluida = () => {
        const confirmar = window.confirm(`Tem certeza que deseja marcar a comanda da Mesa ${mesaSelecionada} como concluída?`);
        if (!confirmar) return;

        const zerada = comandas[mesaSelecionada].map(item => ({ ...item, quantidade: 0 }));
        setComandas(prev => ({ ...prev, [mesaSelecionada]: zerada }));
        alert(`Comanda da Mesa ${mesaSelecionada} marcada como concluída!`);
        fecharComanda();
    };

    const removerComanda = () => {
        const confirmar = window.confirm(`Tem certeza que deseja remover a comanda da Mesa ${mesaSelecionada}?`);
        if (!confirmar) return;

        const zerada = comandas[mesaSelecionada].map(item => ({ ...item, quantidade: 0 }));
        setComandas(prev => ({ ...prev, [mesaSelecionada]: zerada }));
        alert(`Comanda da Mesa ${mesaSelecionada} removida!`);
        fecharComanda();
    };

    const renderPedidoItens = (itens) => {
        return itens.map(item => {
            const lanche = lanches[item.id_item_do_cardapio]; // Get lanche details by id
            if (!lanche) return null; // Skip if lanche not found

            return (
                <div key={item.id} className='item-comanda'>
                    <div className='corpo-pedido'>
                        <img src={lanche.imagem} className="img-lanche" alt={lanche.nome} />
                        <div className='food-text-comanda'>
                            <h1 className='nome-lanche-comanda'>{lanche.nome}</h1>
                            <p className='descricao-lanche-comanda'>Quantidade: {item.quantidade}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="comandas-container">
            <Navbar />
            <h1 className="titulo-comanda">Selecionar Mesa</h1>
            <div className="botoes-mesas">
                {[1, 2, 3, 4, 5, 6].map(mesa => (
                    <button key={mesa} className="botao-mesa" onClick={() => abrirComanda(mesa)}>
                        Mesa {mesa}
                    </button>
                ))}
            </div>

            {/* Pedidos mostrados aqui */}
            <div className="pedidos-container">
                <h2 className="titulo-pedidos-delivery">Pedidos Delivery</h2>
                {pedidos.length === 0 ? (
                    <p>Não há pedidos no momento.</p>
                ) : (
                    pedidos.map(pedido => (
                        <button
                            key={pedido.ID}
                            className="botao-pedido"
                            onClick={() => abrirModalPedido(pedido)}
                        >
                            Pedido #{pedido.ID}
                        </button>
                    ))
                )}
            </div>

            {/* Pedidos Delivery mostrados como botões */}
            <div className="pedidos-container">
                <h2 className="titulo-pedidos-delivery">Pedidos Delivery</h2>
                {pedidosDelivery.length === 0 ? (
                    <p>Não há pedidos delivery no momento.</p>
                ) : (
                    <div className="botoes-pedidos">
                        {pedidosDelivery.map(pedido => (
                            <button
                                key={pedido.ID}
                                className="botao-pedido"
                                onClick={() => abrirSegundoModal(pedido)}
                            >
                                Pedido #{pedido.ID}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <Modal className='modal-comanda' open={modalAberto} onClose={pedidoSelecionado ? fecharModalPedido : pedidoDeliverySelecionado ? fecharPedidoDelivery : fecharComanda}>
                <Box sx={styleModal}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={pedidoSelecionado ? fecharModalPedido : pedidoDeliverySelecionado ? fecharPedidoDelivery : fecharComanda}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.8rem',
                                cursor: 'pointer',
                                color: '#fff',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}
                        >
                            ×
                        </button>
                    </div>
                    {pedidoSelecionado ? (
                        <>
                            <div className='comanda-titulo'>
                                <span className='titulo-comanda-mesa'>Pedido #{pedidoSelecionado.ID}</span>
                            </div>

                            <div className='comanda-body'>
                                <div className='itens-comanda'>
                                    {pedidoSelecionado.itens?.length === 0 ? (
                                        <div className='mensagem-vazia'>
                                            <h2>Sem itens neste pedido!</h2>
                                        </div>
                                    ) : (
                                        renderPedidoItens(pedidoSelecionado.itens) // Render items using the helper function
                                    )}
                                </div>
                            </div>
                        </>
                    ) : pedidoDeliverySelecionado ? (
                        <>
                            <div className='comanda-titulo'>
                                <span className='titulo-comanda-mesa'>Pedido #{pedidoDeliverySelecionado.ID}</span>
                            </div>

                            <div className='comanda-body'>
                                <div className='itens-comanda'>
                                    {pedidoDeliverySelecionado.itens?.length === 0 ? (
                                        <div className='mensagem-vazia'>
                                            <h2>Sem itens neste pedido!</h2>
                                        </div>
                                    ) : (
                                        renderPedidoItens(pedidoDeliverySelecionado.itens) // Render items using the helper function
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        mesaSelecionada && (
                            <>
                                <div className='comanda-titulo'>
                                    <span className='titulo-comanda-mesa'>Comanda da Mesa {mesaSelecionada}</span>
                                </div>

                                <div className='comanda-body'>
                                    <div className='itens-comanda'>
                                        {comandas[mesaSelecionada]?.filter(item => item.quantidade > 0).length === 0 ? (
                                            <div className='mensagem-vazia'>
                                                <h2>Nenhum pedido ainda!</h2>
                                                <p>Adicione algo à comanda!</p>
                                            </div>
                                        ) : (
                                            <>
                                                {comandas[mesaSelecionada]
                                                    .filter(item => item.quantidade > 0)
                                                    .map(item => (
                                                        <div key={item.id} className='item-comanda'>
                                                            <div className='corpo-pedido'>
                                                                <img src={item.imagem} className="img-lanche" alt={item.nome} />
                                                                <div className='food-text-comanda'>
                                                                    <h1 className='nome-lanche-comanda'>{item.nome}</h1>
                                                                    <p className='descricao-lanche-comanda'>{item.descricao}</p>
                                                                </div>
                                                            </div>
                                                            <div className='acoes-lanche'>
                                                                <div className='preco-remover-comanda'>
                                                                    <div className='preco-total-comanda'>
                                                                        R$: {item.preco.toFixed(2)}
                                                                        <div className='preco-quantidade-comanda'>
                                                                            Total: R$ {(item.preco * item.quantidade).toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                    <div className='botoes-acoes'>
                                                                        <button onClick={() => adicionarItem(item.id)}>+</button>
                                                                        <span>{item.quantidade}</span>
                                                                        <button onClick={() => removerItem(item.id)}>-</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <div className='total-compra-comanda'>
                                                    <h2>Total: R$ {precoTotal()}</h2>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className='acoes-comanda'>
                                    <button className='botao-concluir' onClick={marcarComoConcluida}>Marcar como Concluída</button>
                                    <button className='botao-remover' onClick={removerComanda}>Remover</button>
                                </div>

                                <div className='comanda-body'>
                                    <h2 className='titulo-comanda-add'>Adicionar Lanches</h2>
                                    <div className="opcoes-comandas">
                                        {['hamburguer', 'hotdog', 'pastel', 'porcao', 'bebida', 'tudo'].map((tipo) => (
                                            <button
                                                key={tipo}
                                                className={`botao${tipo} ${activeFilter === tipo ? 'active' : ''}`}
                                                onClick={() => handleFilterClick(tipo)}
                                            >
                                                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                            </button>
                                        ))}
                                    </div>

                                    <div className='itens-comanda'>
                                        {comandas[mesaSelecionada]
                                            ?.filter(item => activeFilter === "tudo" || item.tipo === activeFilter)
                                            .map(item => {
                                                const isIndisponivel = item.disponibilidade === "indisponível";
                                                return (
                                                    <div key={item.id} className={`item-comanda ${isIndisponivel ? "indisponivel" : ""}`}>
                                                        <div className='corpo-pedido'>
                                                            <img src={item.imagem} className="img-lanche" alt={item.nome} />
                                                            <div className='food-text-comanda'>
                                                                <h1 className='nome-lanche-comanda'>{item.nome}</h1>
                                                                <p className='descricao-lanche-comanda'>{item.descricao}</p>
                                                            </div>
                                                        </div>
                                                        <div className='acoes-lanche'>
                                                            <div className='preco-remover-comanda'>
                                                                <div className='preco-total-comanda'>
                                                                    R$: {item.preco.toFixed(2)}
                                                                </div>
                                                                <button
                                                                    className={`button-add-comanda ${isIndisponivel ? 'indisponivel-btn' : ''}`}
                                                                    onClick={() => !isIndisponivel && adicionarItem(item.id)}
                                                                    disabled={isIndisponivel}
                                                                >
                                                                    {isIndisponivel ? 'Indisponível' : 'Adicionar'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </Box>
            </Modal>

            {/* Segundo Modal para pedidos de delivery */}
            <Modal className='modal-comanda' open={modalDeliveryAberto} onClose={fecharSegundoModal}>
                <Box sx={styleModal}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={fecharSegundoModal}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.8rem',
                                cursor: 'pointer',
                                color: '#fff',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}
                        >
                            ×
                        </button>
                    </div>
                    {pedidoDeliverySelecionado ? (
                        <>
                            <div className='comanda-titulo'>
                                <span className='titulo-comanda-mesa'>Pedido #{pedidoDeliverySelecionado.ID}</span>
                            </div>

                            <div className='comanda-body'>
                                <div className='itens-comanda'>
                                    {pedidoDeliverySelecionado.itens?.length === 0 ? (
                                        <div className='mensagem-vazia'>
                                            <h2>Sem itens neste pedido!</h2>
                                        </div>
                                    ) : (
                                        renderPedidoItens(pedidoDeliverySelecionado.itens) // Render items using the helper function
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='mensagem-vazia'>
                            <h2>Selecione um pedido para visualizar os detalhes.</h2>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default Comandas;

import '../TelasColaboradoresCss/Comandas.css';
import { useState, useEffect } from "react";
import { getLanches } from "../../Services/api";
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: '#141c1e',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto'
};

function Comandas() {
    const [lanches, setLanches] = useState([]);
    const [comandas, setComandas] = useState({});
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const fetchLanches = async () => {
            try {
                const dados = await getLanches();
                const lanchesPreparados = dados.map(lanche => ({
                    ...lanche,
                    preco: Number(lanche.preco) || 0,
                    quantidade: 0
                }));

                setLanches(lanchesPreparados);

                const inicial = {};
                for (let i = 1; i <= 6; i++) {
                    inicial[i] = lanchesPreparados.map(item => ({ ...item }));
                }
                setComandas(inicial);
            } catch (error) {
                console.error("Erro ao buscar lanches:", error);
            }
        };

        fetchLanches();
    }, []);

    const abrirComanda = (mesa) => {
        setMesaSelecionada(mesa);
        setModalAberto(true);
    };

    const fecharComanda = () => {
        setMesaSelecionada(null);
        setModalAberto(false);
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

        const zerada = comandas[mesaSelecionada].map(item => ({
            ...item,
            quantidade: 0
        }));

        setComandas(prev => ({ ...prev, [mesaSelecionada]: zerada }));
        alert(`Comanda da Mesa ${mesaSelecionada} marcada como concluída!`);
        fecharComanda();
    };

    const removerComanda = () => {
        const confirmar = window.confirm(`Tem certeza que deseja remover a comanda da Mesa ${mesaSelecionada}?`);
        if (!confirmar) return;

        const zerada = comandas[mesaSelecionada].map(item => ({
            ...item,
            quantidade: 0
        }));

        setComandas(prev => ({ ...prev, [mesaSelecionada]: zerada }));
        alert(`Comanda da Mesa ${mesaSelecionada} removida!`);
        fecharComanda();
    };

    return (
        <div className="comandas-container">
            <h1 className="titulo-comanda">Selecionar Mesa</h1>
            <div className="botoes-mesas">
                {[1, 2, 3, 4, 5, 6].map(mesa => (
                    <button key={mesa} className="botao-mesa" onClick={() => abrirComanda(mesa)}>
                        Mesa {mesa}
                    </button>
                ))}
            </div>

            <Modal className='modal-comanda' open={modalAberto} onClose={fecharComanda}>
                <Box sx={styleModal}>
                    {mesaSelecionada && (
                        <>
                            <div className='comanda-titulo'>
                                <span className='titulo-comanda'>Comanda da Mesa {mesaSelecionada}</span>
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
                                <h2 className='titulo-comanda'>Adicionar Lanches</h2>
                                <div className='itens-comanda'>
                                    {comandas[mesaSelecionada]?.map(item => (
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
                                                    </div>
                                                    <button className='botao-add-comandas' onClick={() => adicionarItem(item.id)}>Adicionar</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default Comandas;

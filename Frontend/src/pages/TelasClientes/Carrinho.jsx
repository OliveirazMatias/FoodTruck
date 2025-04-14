import '../TelasClientesCss/Carrinho.css';
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import { FormControlLabel, Switch, Grow } from '@mui/material';
import piximg from '../../assets/carrinho/piximg.jpg';
import masterimg from '../../assets/carrinho/masterimg.jpg';
import { Lanches } from './Cardapio'; // Importar a lista Lanches
import { getLanches } from "../../Services/api"; // Importar API correta

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'auto',
    width: '35%',
    bgcolor: '#B42625',
    border: '2px solid #000',
    boxShadow: 0,
    p: 4,
    backdropFilter: 'blur(10px)',
    borderRadius: '2rem',
};

const backdropStyle = {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

function Carrinho() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);

    useEffect(() => {
        const fetchLanches = async () => {
            try {
                const allLanches = await getLanches(); // Buscar todos os lanches do backend
                const filteredLanches = allLanches.filter(lanche => Lanches.includes(lanche.id)); // Filtrar pelos IDs em Lanches
                setItems(filteredLanches.map(lanche => ({ ...lanche, quantidade: 1 }))); // Inicializar com quantidade 1
            } catch (error) {
                console.error("Erro ao buscar lanches:", error);
            }
        };
        fetchLanches();
    }, []);

    const precoTotal = () => {
        return items.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
    };

    const adicionarItem = (id) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, quantidade: item.quantidade + 1 }; // Incrementa a quantidade
            }
            return item;
        });
        setItems(updatedItems);
    };

    const removerItem = (id) => {
        const updatedItems = items
            .map((item) => {
                if (item.id === id) {
                    return { ...item, quantidade: item.quantidade - 1 }; // Decrementa a quantidade
                }
                return item;
            })
            .filter((item) => item.quantidade > 0); // Remove itens com quantidade 0
        setItems(updatedItems);
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
    const handleClose = () => setOpen(false);

    return (
        <div className="carrinho-container">
            <div className='carrinho-titulo'>
                <img className='icon-carrinho' src={carrinho} alt="icon-carrinho" />
                <span className='titulo-carrinho'>Carrinho</span>
            </div>
            <div className='carrinho_body'>
                <div className='pedidos_container'>
                    {items.map((lanche, index) => (
                        <div key={lanche.id} className='pedidos_lista'>
                            <div className='corpo_pedido'>
                                <img src={lanche.imagem} className="img_lanche" alt={`produto0${index + 1}`} />
                                <div className='food_text_carrinho'>
                                    <h1 className='nome_lanche_carrinho'>{lanche.nome}</h1>
                                    <p className='descricao_lanche_carrinho'>{lanche.descricao}</p>
                                </div>
                            </div>
                            <div className='jogar-pro-ladinho'>
                                <div className='preco-remover-carrinho'>
                                    <div className='preco-total-carrinho'>
                                        R$: {lanche.preco ? Number(lanche.preco).toFixed(2) : "0.00"}
                                    </div>
                                    <div className='botoes-acoes'>
                                        <button className='button-add-pedido' onClick={() => adicionarItem(lanche.id)}>+</button>
                                        <span className='quantidade-item'>{lanche.quantidade}</span>
                                        <button className='button-remover-pedido' onClick={() => removerItem(lanche.id)}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='total-compra'>
                        TOTAL: R${precoTotal()}
                    </div>
                </div>
                <div className='opcoes-consumo'>
                    <span className='titulo-opcoes'>OPÇÕES DE CONSUMO</span>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} />}
                        label="CONSUMIR NO LOCAL"
                        className='switch'
                    />
                    <Box sx={{ display: 'flex' }}>
                        <Grow in={checked}>
                            <input type="text" className='input_switch' placeholder='Numero da Mesa' />
                        </Grow>
                    </Box>

                    <FormControlLabel
                        control={<Switch checked={checked1} onChange={handleChange1} />}
                        label="ENTREGA"
                        className='switch'
                    />
                    <Box sx={{ display: 'flex' }}>
                        <Grow in={checked1}>
                            <input type="text" className='input_switch' placeholder='Endereço de Entrega' />
                        </Grow>
                    </Box>
                </div>
                <div>
                    <div className='finalizar-pedido'>
                        <button className='pedido-finalizado' onClick={handleOpen}>Finalizar Pedido</button>
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
                            <div className='modal-finalizar-pedido'>
                                <div className='container-tudo-modal'>
                                    <div className='titulo-modal-finalizar'>
                                        <h1 className='titulo-texto-modal'>
                                            FORMAS DE PAGAMENTO
                                        </h1>
                                    </div>
                                    <div className='container-descricao-modal'>
                                        <div className='descricao-modal-finalizar'>
                                            <p className='descricao-texto-amarelo-modal'>
                                                PEDIDO:
                                            </p>
                                            <p className='descricao-texto-branco-modal'>
                                                R${precoTotal()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='finalizar-compra-modal'>
                                        <button className='button-finalizar-compra'>
                                            Finalizar Compra
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Carrinho;
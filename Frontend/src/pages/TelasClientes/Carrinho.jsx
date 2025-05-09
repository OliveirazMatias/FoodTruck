import '../TelasClientesCss/Carrinho.css';
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import { FormControlLabel, Switch, Grow } from '@mui/material';
import piximg from '../../assets/carrinho/piximg.jpg';
import masterimg from '../../assets/carrinho/masterimg.jpg';
import { Lanches } from './Cardapio';
import { getLanches, deleteItemPedido } from "../../Services/api";
import axios from "axios";

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
    const [endereco, setEndereco] = useState({
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        complemento: "",
    });

    useEffect(() => {
        const fetchLanches = async () => {
            try {
                const allLanches = await getLanches();
                const filteredLanches = allLanches.filter(lanche => Lanches.some(item => item.id === lanche.id));
                const updatedItems = filteredLanches.map(lanche => {
                    const itemInCart = Lanches.find(item => item.id === lanche.id);
                    return { ...lanche, quantidade: itemInCart ? itemInCart.quantidade : 1 };
                });
                setItems(updatedItems);
            } catch (error) {
                console.error("Erro ao buscar lanches:", error);
            }
        };
        fetchLanches();
    }, []);

    const precoTotal = () => {
        return items.reduce((total, item) => {
            const subtotal = item.preco * item.quantidade;
            return total + subtotal;
        }, 0).toFixed(2);
    };

    const adicionarItem = (id) => {
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, quantidade: item.quantidade + 1 };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const removerItem = async (id) => {
        try {
            console.log("Removendo item com ID:", id); // Log para depuração
            await deleteItemPedido(id);
            const updatedItems = items.filter((item) => item.id !== id);
            setItems(updatedItems);
        } catch (error) {
            console.error("Erro ao remover item do carrinho:", error);
            alert("Erro ao remover item. Verifique sua conexão ou tente novamente mais tarde.");
        }
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

    const buscarEndereco = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (!response.data.erro) {
                    setEndereco((prev) => ({
                        ...prev,
                        rua: response.data.logradouro,
                        bairro: response.data.bairro,
                        cidade: response.data.localidade,
                    }));
                } else {
                    console.error("CEP inválido.");
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    };

    const handleEnderecoChange = (e) => {
        const { name, value } = e.target;

        // Validação para o campo 'numero' - impede números negativos
        if (name === "numero") {
            const apenasNumerosPositivos = /^\d*$/; // permite apenas inteiros positivos
            if (!apenasNumerosPositivos.test(value)) {
                return; // impede atualização se o valor for inválido
            }
        }

        setEndereco((prev) => ({ ...prev, [name]: value }));

        if (name === "cep") {
            buscarEndereco(value.replace(/\D/g, ""));
        }
    };

    return (
        <div className="carrinho-container">
            <div className='carrinho-titulo'>
                <img className='icon-carrinho' src={carrinho} alt="icon-carrinho" />
                <span className='titulo-carrinho'>Carrinho</span>
            </div>
            <div className='carrinho_body'>
                <div className='pedidos_container'>
                    {items.length === 0 ? (
                        <div className='mensagem-vazia'>
                            <h2>Seu carrinho está vazio!</h2>
                            <p>Adicione itens deliciosos ao seu pedido e aproveite!</p>
                        </div>
                    ) : (
                        <>
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
                                                <div className='preco-quantidade'>
                                                    Total: R$ {(lanche.preco * lanche.quantidade).toFixed(2)}
                                                </div>

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
                                <h2>Total: R$ {precoTotal()}</h2>
                            </div>
                        </>
                    )}
                </div>
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
                                <div className='div-endereco'>
                                    <span className='titulo-endereco'>Endereço da Entrega</span>
                                    <div className='endereco'>
                                        <div className='linha-endereco'>
                                            <input
                                                type="text"
                                                className='input_switch input-switch-cep'
                                                name="cep"
                                                placeholder='CEP'
                                                required
                                                value={endereco.cep}
                                                onChange={handleEnderecoChange}
                                                maxLength={9}
                                            />
                                            <input
                                                type="text"
                                                className='input_switch input-switch-cidade'
                                                name="cidade"
                                                placeholder='Cidade'
                                                required
                                                value={endereco.cidade}
                                                onChange={handleEnderecoChange}
                                            />
                                        </div>
                                        <div className='linha-endereco'>
                                            <input
                                                type="text"
                                                className='input_switch input-switch-rua'
                                                name="rua"
                                                placeholder='Rua'
                                                required
                                                value={endereco.rua}
                                                onChange={handleEnderecoChange}
                                            />
                                            <input
                                                type="text"
                                                className='input_switch input-switch-numero'
                                                name="numero"
                                                placeholder='Número'
                                                required
                                                value={endereco.numero}
                                                onChange={handleEnderecoChange}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                            />
                                        </div>
                                        <div className='linha-endereco'>
                                            <input
                                                type="text"
                                                className='input_switch input-switch-bairro'
                                                name="bairro"
                                                placeholder='Bairro'
                                                required
                                                value={endereco.bairro}
                                                onChange={handleEnderecoChange}
                                            />
                                            <input
                                                type="text"
                                                className='input_switch input-switch-complemento'
                                                name="complemento"
                                                placeholder='Complemento (Opcional)'
                                                value={endereco.complemento}
                                                onChange={handleEnderecoChange}
                                            />
                                        </div>
                                    </div>
                                    <button className='finalizar-compra'>Próxima Etapa</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Carrinho;

import '../TelasClientesCss/Carrinho.css';
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import lanchesData from '../TelasClientes/lanches.json';
import { FormControlLabel, Switch, Grow } from '@mui/material';
import piximg from '../../assets/carrinho/piximg.jpg';
import masterimg from '../../assets/carrinho/masterimg.jpg';

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
    const [lanches, setLanches] = useState([]);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);

    useEffect(() => {
        setLanches(lanchesData);
    }, []);

    const listaid = [2, 3, 9];

    const preco = precoTotal();

    function precoTotal() {
        let total = 0;
        lanches
            .filter(lanche => listaid.includes(lanche.ID))
            .map(lanche => total += lanche.Preco);
        return total.toFixed(2);
    }

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
                    {lanches
                        .filter(lanche => listaid.includes(lanche.ID))
                        .map((lanche, index) => (
                            <div key={lanche.ID} className='pedidos_lista'>
                                <div className='corpo_pedido'>
                                    <img src={lanche.Imagem} className="img_lanche" alt={`produto0${index + 1}`} />
                                    <div className='food_text_carrinho'>
                                        <h1 className='nome_lanche_carrinho'>{lanche.Nome}</h1>
                                        <p className='descricao_lanche_carrinho'>{lanche.Descricao}</p>
                                    </div>
                                </div>
                                <div className='preco_total'>R$: {lanche.Preco.toFixed(2)}</div>
                            </div>
                        ))}
                    <div className='total-compra'>
                        TOTAL: R${preco}
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
                                                R$ 50.00
                                            </p>
                                        </div>
                                        <div className='todos-pedidos-modal'>
                                            <div className='pedido1-modal'>
                                                <h1 className='pedido1-descricao-modal'>
                                                    1 X-FRANGO
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='container-formas-pagamento'>
                                        <div className='formas-pagamento-modal'>
                                            <div className='forma-pix-modal'>
                                                <button className='container-forma-master'>
                                                    <img src={piximg} alt='pix' className='pix-img' />
                                                </button>
                                            </div>
                                            <div className='forma-master-modal'>
                                                <button className='container-forma-master'>
                                                    <img src={masterimg} alt='master' className='master-img' />
                                                </button>
                                            </div>
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
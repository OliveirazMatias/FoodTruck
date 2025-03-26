import '../TelasClientesCss/Cardapio.css';
import imginconlanche from '../../assets/cardapio/confiralancamentos/iconlanche.jpg';
import imginconbebidas from '../../assets/cardapio/confiralancamentos/iconbebidas.jpg';
import imginconacompanhamento from '../../assets/cardapio/confiralancamentos/iconacompanhamentos.jpg';
import imgconfira from '../../assets/cardapio/confiralancamentos/confiralancamentos.jpg';
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import { useState, useEffect } from "react";
import lanchesData from '../TelasClientes/lanches.json';
import Modal from '@mui/material/Modal'; 
import Box from '@mui/material/Box'; 
import { useNavigate } from 'react-router-dom';
import NavBarCardapio from '../componentes/NavBarCardapio';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFBA21',
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

function Cardapio() {
    const [lanches, setLanches] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedLanche, setSelectedLanche] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLanches(lanchesData);
    }, []);

    const handleOpen = (lanche) => {
        setSelectedLanche(lanche);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setquantity(1);
    };

    const [quantity, setquantity] = useState(1);

    if  (quantity < 1) {
        setquantity(1);
    }

    let subtotal = selectedLanche?.Preco * quantity;

    function ToCarrinho() {
        navigate('/Carrinho');
    }

    const lancamentosId = [2, 3, 10]

    return (
        <div className='cardapio'>
            <div className="confira-lancamentos">
                <div className="confira-img">
                    <img src={imgconfira} alt="lanche ilustrativo" />
                </div>
                <div className="confira-texto">
                    <h1 className="confira-titulo">
                        <span className="confira-highlight">Confira</span> os Lançamentos
                    </h1>
                    <div className="confira-subtexto">
                        Experimente nossos novos lançamentos e descubra sabores incríveis.
                    </div>
                    <div className="incos">
                        <div className='incons-lanche'>
                            <img src={imginconlanche} alt="icone-lanche" />
                            <p>Lanche</p>
                        </div>
                        <div className='incons-lanche'>
                            <img src={imginconbebidas} alt="icone-bebidas" />
                            <p>Bebidas</p>
                        </div>
                        <div className='incons-lanche'>
                            <img src={imginconacompanhamento} alt="icone-acompanhamentos" />
                            <p>Acompanhamentos</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='lancamentos'>
                <h1 className='lancamento-titulo'>
                    <span className="lancamentos-highlight">Lançamentos</span>
                </h1>
                <div className='lancamento-produtos'>
                    {lanches
                        .filter(lanche => lancamentosId.includes(lanche.ID))
                        .map((lanche, index) => (
                            <button onClick={() => handleOpen(lanche)} className={`produtos0${index + 1}`}>
                                <div key={lanche.ID}>
                                        <p className='lancamentoNome'>{lanche.Nome}</p>
                                        <img src={lanche.Imagem} className="lancamentoImg" alt={`produto0${index + 1}`} />
                                </div>
                            </button>

                        ))}
                </div>
            </div>
            <div className='cardapio-pedidos'>
                <h1 className='cardapio-titulo'>
                    <span className="cardapio-highlight">Cardápio</span>
                </h1>
                <div className='cardapio-opcoes'>
                    <div className='lanches'>
                        {lanches.map((lanche, index) => (
                            <div key={index} className='food_body'>
                                <button onClick={() => handleOpen(lanche)} className='food_button'>
                                    <div className="image_div">
                                        <img src={lanche.Imagem} alt={lanche.Nome} className="image" />
                                    </div>
                                    <div className="food_text">
                                        <h2 className="nome_comida">{lanche.Nome}</h2>
                                        <p className="descricao">{lanche.Descricao}</p>
                                        <div className="preco">R$ {lanche.Preco.toFixed(2)}</div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedLanche && (
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
                        <img src={selectedLanche.Imagem} className="image" alt="" />
                        <div className='modal_body'>
                        <div className='title_modal'>
                            {selectedLanche.Nome}
                        </div>
                        <div className='description_modal'>
                            {selectedLanche.Descricao}
                        </div>
                        <div className='quantity_modal'>
                            <div className="increase_button">
                                <button className='button_add' onClick={() => setquantity(quantity -1)}>-</button>
                                <div className='quantity_number'>{quantity}</div>
                                <button className='button_sub' onClick={() => setquantity(quantity +1)}>+</button>
                            </div>
                            <div className='price_modal'>
                                <div className='preco_modal'>
                                    R$ {selectedLanche.Preco.toFixed(2)}
                                </div>

                                <div className='total_modal'>
                                    Subtotal: R$ {subtotal.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <div className='bottom_modal'>
                            <input type="text" className='obs' placeholder='Alguma Observação:'/>
                            
                            <button className='carrinho' onClick={ToCarrinho}>Adicionar ao carrinho
                                <img src={carrinho} alt="" />
                            </button>
                        </div>
                        </div>
                    </Box>
                </Modal>
            )}
        </div>
    );
}

export default Cardapio;
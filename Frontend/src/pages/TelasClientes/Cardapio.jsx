import '../TelasClientesCss/Cardapio.css';
import imginconlanche from '../../assets/confiralancamentos/iconlanche.jpg';
import imginconbebidas from '../../assets/confiralancamentos/iconbebidas.jpg';
import imginconacompanhamento from '../../assets/confiralancamentos/iconacompanhamentos.jpg';
import imgconfira from '../../assets/confiralancamentos/confiralancamentos.jpg';
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { getLanches } from "../../Services/api";
import Navbar from '../../components/NavBar/navbar';
import { useRef } from "react";

export const Lanches = [];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '30vw',
    height: 'auto',
    bgcolor: '#FFBA21',
    border: '2px solid #000',
    boxShadow: 24,
    p: '1.5vw',
    backdropFilter: 'blur(10px)',
    borderRadius: '1.5vw',
    overflowY: 'auto',
};

const backdropStyle = {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

function Cardapio() {
    const [activeFilter, setActiveFilter] = useState("tudo");
    const [lanches, setLanches] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedLanche, setSelectedLanche] = useState(null);
    const navigate = useNavigate();
    const [obs, setObs] = useState("");
    const [quantity, setQuantity] = useState(1);
    const cardapioRef = useRef(null);

    const handleObs = (event) => {
        setObs(event.target.value);
    };

    const handleOpen = (lanche) => {
        setSelectedLanche(lanche);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setQuantity(1);
    };

    useEffect(() => {
        const fetchLanches = async () => {
            try {
                const data = await getLanches();
                setLanches(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao buscar lanches:", error);
            }
        };
        fetchLanches();
    }, []);

    const handleAddToCart = () => {
        if (!selectedLanche) return;
        const existingItemIndex = Lanches.findIndex((item) => item.id === selectedLanche.id);

        if (existingItemIndex !== -1) {
            Lanches[existingItemIndex].quantidade += quantity;
        } else {
            Lanches.push({ ...selectedLanche, quantidade: quantity });
        }

        localStorage.setItem('carrinho', JSON.stringify(Lanches));

        alert(`Adicionado ${quantity} ${selectedLanche.nome}(s) ao carrinho!`);
        navigate("/carrinho");
        setOpen(false);
        setQuantity(1);
    };

    const subtotal = selectedLanche ? selectedLanche.preco * quantity : 0;

    const handleFilterClick = (filterType) => {
        setActiveFilter(filterType);
    };

    const lancamentosId = [6, 7, 8]

    const handleScrollAndFilter = (filterType) => {
        setActiveFilter(filterType);

        setTimeout(() => {
            cardapioRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className='cardapio'>
            <Navbar />
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
                        <div className='incons-lanche' onClick={() => handleScrollAndFilter('hamburguer')}>
                            <img src={imginconlanche} alt="icone-lanche" />
                            <p>Lanches</p>
                        </div>
                        <div className='incons-lanche' onClick={() => handleScrollAndFilter('bebida')}>
                            <img src={imginconbebidas} alt="icone-bebidas" />
                            <p>Bebidas</p>
                        </div>
                        <div className='incons-lanche' onClick={() => handleScrollAndFilter('porcao')}>
                            <img src={imginconacompanhamento} alt="icone-acompanhamentos" />
                            <p>Porções</p>
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
                        .filter(lanche => lancamentosId.includes(lanche.id))
                        .map((lanche, index) => (
                            <button key={lanche.id} onClick={() => handleOpen(lanche)} className={`produtos0${index + 1}`}>
                                <div>
                                    <p className='lancamentoNome'>{lanche.nome}</p>
                                    <img src={lanche.imagem} className="lancamentoImg" alt={`produto0${index + 1}`} />
                                </div>
                            </button>
                        ))}
                </div>
            </div>
            <div className='cardapio-pedidos' ref={cardapioRef} >
                <h1 className='cardapio-titulo'>
                    <span className="cardapio-highlight">Cardápio</span>
                </h1>

                <div className="opcoes">
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

                <div className='cardapio-opcoes'>
                    <div className='lanches'>
                        {lanches
                            .filter(lanche => activeFilter === "tudo" || lanche.tipo === activeFilter)
                            .map((lanche) => {
                                const isIndisponivel = lanche.disponibilidade === "indisponível";
                                return (
                                    <div key={lanche.id} className={`food_body ${isIndisponivel ? "indisponivel" : ""}`}>
                                        <button
                                            onClick={() => !isIndisponivel && handleOpen(lanche)}
                                            className='food_button'
                                            disabled={isIndisponivel}
                                        >
                                            <div className="image_div">
                                                <img src={lanche.imagem} alt={lanche.nome} className="image-lanches-cardapio" />
                                                {isIndisponivel && <div className="overlay-indisponivel">Indisponível</div>}
                                            </div>
                                            <div className="food_text">
                                                <h2 className="nome_comida">{lanche.nome}</h2>
                                                <p className="descricao">{lanche.descricao}</p>
                                                <div className="preco">R$ {Number(lanche.preco).toFixed(2)}</div>
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
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
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={handleClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '1.8rem',
                                    cursor: 'pointer',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <img src={selectedLanche.imagem} className="image-lanche-modal" alt="" />
                        <div className='modal_body'>
                            <div className='title_modal'>
                                {selectedLanche.nome}
                            </div>
                            <div className='description_modal'>
                                {selectedLanche.descricao}
                            </div>
                            <div className='quantity_modal'>
                                <div className="increase_button">
                                    <button className='button_add' onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                    <div className='quantity_number'>{quantity}</div>
                                    <button className='button_sub' onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                                <div className='price_modal'>
                                    <div className='preco_modal'>
                                        R$ {Number(selectedLanche.preco).toFixed(2)}
                                    </div>
                                    <div className='total_modal'>
                                        Subtotal: R$ {(selectedLanche.preco * quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                            <div className='bottom_modal'>
                                <textarea
                                    className='obs'
                                    placeholder='Alguma Observação:'
                                    value={obs}
                                    onChange={handleObs}
                                />
                                <button className='carrinho' onClick={handleAddToCart}>
                                    Adicionar ao carrinho
                                    <img className='carrinho-modal' src={carrinho} alt="" />
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
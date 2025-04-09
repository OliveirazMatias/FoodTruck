import '../TelasClientesCss/Cardapio.css';
import imginconlanche from '../../assets/icons/iconperfil.png';
import imginconbebidas from '../../assets/confiralancamentos/iconbebidas.jpg';
import imginconacompanhamento from '../../assets/confiralancamentos/iconacompanhamentos.jpg';
import imgconfira from '../../assets/confiralancamentos/confiralancamentos.jpg';
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import { useState, useEffect } from "react";
import lanchesData from '../TelasClientes/lanches.json';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import NavBarCardapio from '../../components/NavBarCardapio/NavBarCardapio';
import { getLanches, postItemPedido } from "../../Services/api"; // Importar API correta

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
    const [activeFilter, setActiveFilter] = useState("all"); // New state for filtering
    const [lanches, setLanches] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedLanche, setSelectedLanche] = useState(null);
    const navigate = useNavigate();
    const [obs, setObs] = useState("");
    const [quantity, setQuantity] = useState(1); // Estado inicial ajustado
  
    const handleObs = (event) => {
      setObs(event.target.value);
    };
  
    const handleOpen = (lanche) => {
      setSelectedLanche(lanche);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setQuantity(1); // Resetar quantidade ao fechar o modal
    };
  
    useEffect(() => {
      const fetchLanches = async () => {
        try {
          const data = await getLanches(); // Buscar lanches do backend
          setLanches(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Erro ao buscar lanches:", error);
        }
      };
      fetchLanches();
    }, []);
  
    const handleAddToCart = async () => {
      if (!selectedLanche) return;
  
      const itemPedido = {
        id_pedido: 1, // Substituir pelo ID do pedido correto
        id_item_do_cardapio: selectedLanche.id,
        quantidade: quantity,
        observacao: obs,
      };
  
      try {
        await postItemPedido(itemPedido); // Enviar item ao backend
        navigate("/Carrinho");
      } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
      }
    };
  
    const subtotal = selectedLanche ? selectedLanche.preco * quantity : 0;
  
    // Filter handler function
    const handleFilterClick = (filterType) => {
        setActiveFilter(filterType);
    };
    
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
            <div className='cardapio-pedidos'>
                <h1 className='cardapio-titulo'>
                    <span className="cardapio-highlight">Cardápio</span>
                </h1>
                <div className="opcoes">
                    <button 
                        className={`botaohamburguer ${activeFilter === "hamburguer" ? "active" : ""}`} 
                        onClick={() => handleFilterClick("hamburguer")}
                    >
                        Hambúrguer
                    </button>
                    <button 
                        className={`botaohotdog ${activeFilter === "hotdog" ? "active" : ""}`} 
                        onClick={() => handleFilterClick("hotdog")}
                    >
                        Hot-Dog
                    </button>
                    <button 
                        className={`botaopastel ${activeFilter === "pastel" ? "active" : ""}`} 
                        onClick={() => handleFilterClick("pastel")}
                    >
                        Pastel
                    </button>
                    <button 
                        className={`botaoporcoes ${activeFilter === "porcao" ? "active" : ""}`} 
                        onClick={() => handleFilterClick("porcao")}
                    >
                        Porções
                    </button>
                    <button 
                        className={`botaobebidas ${activeFilter === "bebida" ? "active" : ""}`} 
                        onClick={() => handleFilterClick("bebida")}
                    >
                        Bebidas
                    </button>
                    <button 
                        className={`botaotodos ${activeFilter === "all" ? "active" : ""}`} 
                        onClick={() => handleFilterClick("all")}
                    >
                        Todos
                    </button>
                </div>

                <div className='cardapio-opcoes'>
                    <div className='lanches'>
                        {lanches
                            .filter(lanche => activeFilter === "all" || lanche.tipo === activeFilter)
                            .map((lanche, index) => (
                                <div key={index} className='food_body'>
                                    <button onClick={() => handleOpen(lanche)} className='food_button'>
                                        <div className="image_div">
                                            <img src={lanche.imagem} alt={lanche.nome} className="image" />
                                        </div>
                                        <div className="food_text">
                                            <h2 className="nome_comida">{lanche.nome}</h2>
                                            <p className="descricao">{lanche.descricao}</p>
                                            <div className="preco">
                                                R$ {Number(lanche.preco).toFixed(2)} {/* Garantir que lanche.preco seja um número */}
                                            </div>
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
                        <img src={selectedLanche.imagem} className="image" alt="" />
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
                                        R$ {Number(selectedLanche.preco).toFixed(2)} {/* Garantir que selectedLanche.preco seja um número */}
                                    </div>

                                    <div className='total_modal'>
                                        Subtotal: R$ {Number(subtotal).toFixed(2)} {/* Garantir que subtotal seja um número */}
                                    </div>
                                </div>
                            </div>

                            <div className='bottom_modal'>
                                <input type="text" className='obs' placeholder='Alguma Observação:' value={obs} onChange={handleObs} />

                                <button className='carrinho' onClick={handleAddToCart}>Adicionar ao carrinho
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
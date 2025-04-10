import '../TelasClientesCss/Carrinho.css';
import { useState, useEffect } from "react";
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import lanchesData from '../TelasClientes/lanches.json';
import { FormControlLabel, Switch, Grow } from '@mui/material';

function Carrinho() {
    const [items, setItems] = useState([]);
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);

    useEffect(() => {
        // Inicializa apenas os 3 primeiros itens do JSON com quantidade 1
        const initializedItems = lanchesData.slice(0, 3).map((lanche) => ({
            ...lanche,
            quantidade: 1,
        }));
        setItems(initializedItems);
    }, []);

    const adicionarItem = (id) => {
        const updatedItems = items.map((item) => {
            if (item.ID === id) {
                return { ...item, quantidade: item.quantidade + 1 };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const removerItem = (id) => {
        const updatedItems = items.map((item) => {
            if (item.ID === id) {
                return { ...item, quantidade: item.quantidade - 1 };
            }
            return item;
        }).filter((item) => item.quantidade > 0); // Remove o lanche se a quantidade for 0
        setItems(updatedItems);
    };

    const precoTotal = () => {
        return items.reduce((total, item) => total + item.Preco * item.quantidade, 0).toFixed(2);
    };

    const handleChange = () => {
        setChecked((prev) => !prev);
        if (checked1) setChecked1(false);
    };

    const handleChange1 = () => {
        setChecked1((prev) => !prev);
        if (checked) setChecked(false);
    };

    return (
        <div className="carrinho-container">
            <div className='carrinho-titulo'>
                <img className='icon-carrinho' src={carrinho} alt="icon-carrinho" />
                <h1 className='titulo-carrinho'>Meu Carrinho</h1>
            </div>
            <div className='carrinho_body'>
                <div className='pedidos_container'>
                    {items.map((lanche) => (
                        <div key={lanche.ID} className='pedidos_lista'>
                            <div className='corpo_pedido'>
                                <img src={lanche.Imagem} className="img_lanche" alt={lanche.Nome} />
                                <div className='food_text_carrinho'>
                                    <h1 className='nome_lanche_carrinho'>
                                        {lanche.Nome} ({lanche.quantidade})
                                    </h1>
                                    <p className='descricao_lanche_carrinho'>{lanche.Descricao}</p>
                                </div>
                            </div>
                            <div className='jogar-pro-ladinho'>
                                <div className='preco-remover-carrinho'>
                                    <div className='preco-total-carrinho'>R$: {(lanche.Preco * lanche.quantidade).toFixed(2)}</div>
                                    <div className='botoes-acoes'>
                                        <button className='button-add-pedido' onClick={() => adicionarItem(lanche.ID)}>+</button>
                                        <button className='button-remover-pedido' onClick={() => removerItem(lanche.ID)}>-</button>
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
                    <span className='titulo-opcoes'>Opções de Consumo</span>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} />}
                        label="CONSUMIR NO LOCAL"
                        className='switch'
                    />
                    <Grow in={checked}>
                        <input type="text" className='input_switch' placeholder='Número da Mesa' />
                    </Grow>
                    <FormControlLabel
                        control={<Switch checked={checked1} onChange={handleChange1} />}
                        label="ENTREGA"
                        className='switch'
                    />
                    <Grow in={checked1}>
                        <input type="text" className='input_switch' placeholder='Endereço de Entrega' />
                    </Grow>
                </div>
                <div className='finalizar-pedido'>
                    <button className='pedido-finalizado'>Finalizar Pedido</button>
                </div>
            </div>
        </div>
    );
}

export default Carrinho;
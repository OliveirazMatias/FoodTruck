import '../TelasClientesCss/Carrinho.css';
import { useState, useEffect } from "react";
import carrinho from '../../assets/cardapio/shopping-cart.svg';
import lanchesData from '../TelasClientes/lanches.json';
import { FormControlLabel, Switch, Box, Grow } from '@mui/material';


function Carrinho() {
    const [lanches, setLanches] = useState([]);

    useEffect(() => {
        setLanches(lanchesData);
    }, []);

    const listaid =  [1, 10, 3]

    const preco = precoTotal();

    function precoTotal() {
        let total = 0;
        lanches
            .filter(lanche => listaid.includes(lanche.ID))
            .map(lanche => total += lanche.Preco);
        return total.toFixed(2);
    }

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };
  
    
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
                            <input type="text" className='input_switch' placeholder='Numero da Mesa'/>
                        </Grow>
                        <Grow
                            in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1000 } : {})}
                        >
                            <div>Outro Conteúdo Condicional</div>
                        </Grow>
                    </Box>         

                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} />}
                        label="ENTREGA"
                        className='switch'
                    />
                    <Box sx={{ display: 'flex' }}>
                        <Grow in={checked}>
                            <input type="text" className='input_switch' placeholder='Numero da Mesa'/>
                        </Grow>
                        <Grow
                            in={checked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(checked ? { timeout: 1000 } : {})}
                        >
                            <input type="text" name="" id="" />           
                        </Grow>
                                </Box>         

                       </div>
            <div className='finalizar-pedido'>
                <button className='pedido-finalizado'>Finalizar Pedido</button>
            </div>
        </div>
        </div>
    );
}

export default Carrinho;
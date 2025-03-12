import '../TelasClientesCss/Carrinho.css'; 
import { useState, useEffect } from 'react';
import lanchesData from '../TelasClientes/lanches.json';
import iconcarrinho from '../../assets/carrinho/icon-carrinho.jpg'
import imglancamentos from '../../assets/cardapio/confiralancamentos/lancamentos.jpg';

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
                <img className='icon-carrinho' src={iconcarrinho} alt="icon-carrinho" />
                <span className='titulo-carrinho'>Carrinho</span>
            </div>
            <div className='pedidos-container'>
                <div className='pedidos-carrinho'>
                    <div className='lista-pedidos'>
                        <img className='img-lanche' src={imglancamentos} alt="img-lanche" />
                        <div className='textos-lanche'>
                            <h1 className='nome-lanche'>X-Frango</h1>
                            <h1 className='descricao-lanche'>Hambúrguer de frango, queijo , tomate, alface e cebola.</h1>
                        </div>
                        <div className='preco-unitario'>R$25,00</div>
                    </div>
                    <div className='lista-pedidos'>
                        <img className='img-lanche' src={imglancamentos} alt="img-lanche" />
                        <div className='textos-lanche'>
                            <h1 className='nome-lanche'>X-Frango</h1>
                            <h1 className='descricao-lanche'>Hambúrguer de frango, queijo , tomate, alface e cebola.</h1>
                        </div>
                        <div className='preco-unitario'>R$25,00</div>
                    </div>
                </div>
                <div className='total-compra'>
                    TOTAL: R$50,00
                </div>
            </div>
            <div className='opcoes-consumo'>
                <span className='titulo-opcoes'>Opções de Consumo</span>
            </div>
            <div className='finalizar-pedido'>
                <button className='pedido-finalizado'>Finalizar Pedido</button>
            </div>
        </div>
    );
}

export default Carrinho;
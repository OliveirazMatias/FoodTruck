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

    const listaid =  [2, 3, 9]

    const preco = precoTotal();

    function precoTotal() {
        let total = 0;
        lanches
            .filter(lanche => listaid.includes(lanche.ID))
            .map(lanche => total += lanche.Preco);
        return total.toFixed(2);
    }

    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    const handleChange1 = () => {
        setChecked1((prev) => !prev)
    }
  
    
    return (
        <div className="carrinho-container">
            <h1>Tela de Carrinho</h1>
            <div className="carrinho-conteudo">
                <ul>
                    <li>Produto 1 - R$ 29,90</li>
                    <li>Produto 2 - R$ 19,90</li>
                </ul>
                <div className="carrinho-total">
                    <p>Total: R$ 49,80</p>
                    <button>Finalizar Compra</button>
                </div>
            </div>
        </div>
    );
}

export default Carrinho;
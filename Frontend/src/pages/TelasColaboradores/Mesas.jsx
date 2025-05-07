import React from 'react';
import { useNavigate } from 'react-router-dom'; // import do hook de navegação
import '../TelasColaboradoresCss/Mesas.css';
import imgentregador from '../../assets/mesas/imgentregador.jpg';
import pedido from '../../assets/mesas/pedido.png';

function Mesas() {
    const navigate = useNavigate(); // hook para redirecionar

    const handleExcluir = () => {
        navigate('/comandas'); // redireciona para a tela de comandas
    };

    return (
        <div className='mesas-container-pedidos'>
            <div className='mesas-cabecalho'>
                <h1 className='titulo-mesas'>COMANDAS</h1>
            </div>

            <div className='pedidos-container-cabeçalho'>
                <div className='pedidos-cabecalho'>
                    <div className='mesa'>
                        <h1 className='numero-mesa'>MESA 2</h1>
                    </div>
                    <div className='status-pedido'>
                        <div className='status'>
                            <h1 className='status-texto'>STATUS DO PEDIDO:</h1>
                            <h1 className='resultado'>A Caminho</h1>
                            <img className='entregadorimg' src={imgentregador} alt="img-entregador" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='comanda'>
                <div className='comanda-cabecalho'>
                    <h1 className='titulo-comanda'>PEDIDOS:</h1>
                </div>

                <div className='comanda-container-pedidos'>
                    <div className='pedidos-feitos'>
                            <img src={pedido} alt="img-pedido" />
                        <div className='descricao-container-pedido-feito'>
                            <h1 className='nome-pedido-feito'>X-FRANGO</h1>
                            <p className='descricao-pedido-feito'>Hambúrguer de frango, queijo, tomate, alface e cebola.
                            </p>
                        </div>
                        <div className='preco-pedido-feito'>
                            <h1 className='valor-pedido-feito'>R$25,00</h1>
                        </div>
                    </div>
                    <div className='resultado-pedido-feito'>
                        <h1 className='total-pedido-feito'>TOTAL: <span> <span>R$</span>25,00</span></h1>
                    </div>
                </div>

                <div className='pagamento'>
                    <h1 className='forma-de-pagamento'>FORMA DE PAGAMENTO: Dinheiro</h1>
                </div>

                <div className='botoes-comanda'>
                    <button onClick={handleExcluir} className='botao-excluir-comanda'>Excluir Comanda</button>
                </div>
            </div>
        </div>
    );
}

export default Mesas;

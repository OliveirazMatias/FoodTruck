import React from 'react';
import '../TelasColaboradoresCss/Mesas.css'
import imgentregador from '../../assets/mesas/imgentregador.jpg';

function Mesas() {
    return (
        <div className='mesas-container-pedidos'>
            <div className='cabecalho-quero-arrumar'>
                <div className='mesas-cabecalho'>
                    <h1 className='titulo-mesas'>
                        Comandas
                    </h1>
                </div>
                <div className='pedidos-container-cabeçalho'>
                    <div className='pedidos-cabecalho'>
                        <div className='mesa'>
                            <h1 className='numero-mesa'>
                                MESA 2
                            </h1>
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
                        <h1 className='titulo-comanda'>
                            PEDIDOS:
                        </h1>
                    </div>
                    <div className='comanda-container-pedidos'>
                        <div className='pedidos-feitos'>
                            <div className='img-pedido-feito'>
                                <img src="" alt="imgpedido" />
                            </div>
                            <div className='descricao-container-pedido-feito'>
                                <h1 className='nome-pedido-feito'>
                                X-FRANGO
                                </h1>
                                <h1 className='descricao-pedido-feito'>
                                Hambúrguer de frango, queijo, tomate, alface e cebola.
                                </h1>
                            </div>
                            <div className='preco-pedido-feito'>
                                <h1 className='valor-pedido-feito'>
                                    R$25,00
                                </h1>
                            </div>
                        </div>
                        <div className='resultado-pedido-feito'>
                            <h1 className='total-pedido-feito'>
                                TOTAL: R$25,00
                            </h1>
                        </div>
                    </div>
                    <div className='forma-pagamento-pedidos'>
                        <span className='forma-pagamento-texto'>FORMA DE PAGAMENTO:</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mesas;
import '../TelasClientesCss/Carrinho.css'; // Importando o CSS específico
import iconcarrinho from '../../assets/carrinho/icon-carrinho.jpg'
import imglancamentos from '../../assets/cardapio/confiralancamentos/lancamentos.jpg';

function Carrinho() {
    return (
        <div className="carrinho-container">
            <div className='carrinho-titulo'>
                <img className='icon-carrinho' src={iconcarrinho} alt="icon-carrinho" />
                <span className='titulo-carrinho'>Carrinho</span>
            </div>
            <div className='pedidos-container'>
                <div className='pedidos-carrinho'>
                    <img className='img-lanche' src={imglancamentos} alt="img-lanche" />
                    <div className='textos-lanche'>
                        <h1 className='nome-lanche'>X-Frango</h1>
                        <h1 className='descricao-lanche'>Hambúrguer de frango, queijo , tomate, alface e cebola.</h1>
                    </div>
                </div>
            </div>
            <div className='opcoes-consumo'>
                <span className='titulo-opcoes'>Opções de Consumo</span>
            </div>
        </div>
    );
}

export default Carrinho;

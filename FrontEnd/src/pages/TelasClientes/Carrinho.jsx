import '../TelasClientesCss/Carrinho.css'; // Importando o CSS específico

function Carrinho() {
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

import '../TelasClientesCss/Cardapio.css';
import '../../App.css'
import NavBarCardapio from '../componentes/NavBarCardapio';
import imgconfira from '../../assets/confiralancamentos/confiralancamentos.jpg';
import imginconlanche from '../../assets/confiralancamentos/iconlanche.jpg';
import imginconbebidas from '../../assets/confiralancamentos/iconbebidas.jpg';
import imginconacompanhamento from '../../assets/confiralancamentos/iconacompanhamentos.jpg';
import imglancamentos from '../../assets/confiralancamentos/lancamentos.jpg';

function Cardapio() {
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
                    <div className='produtos01'>
                        <a href="https://github.com/OliveirazMatias/FoodTruck/tree/Mateus">
                            <p>Duplo Carne</p>
                            <img src={imglancamentos} alt="produto01" />
                        </a>    
                    </div>
                    <div className='produtos02'>
                        <a href="">
                            <p>Duplo Carne</p>
                            <img src={imglancamentos} alt="produto02" />
                        </a>
                    </div>
                    <div className='produtos03'>
                        <a href="">
                            <p>Duplo Carne</p>
                            <img src={imglancamentos} alt="produto03" />
                        </a>
                    </div>
                </div>
            </div>
            <div className='cardapio-pedidos'>
                <h1 className='cardapio-titulo'>
                    <span className="cardapio-highlight">Cardápio</span>
                </h1>
                <div className='cardapio-opcoes'>
                    <div className='lanches'>
                        <NavBarCardapio/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardapio;
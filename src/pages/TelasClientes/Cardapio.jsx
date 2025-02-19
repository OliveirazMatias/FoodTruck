import '../TelasClientesCss/Cardapio.css';
import imgconfira from '../../assets/confiralancamentos/confiralancamentos.jpg';
import imginconlanche from '../../assets/confiralancamentos/iconlanche.jpg';
import imginconbebidas from '../../assets/confiralancamentos/iconbebidas.jpg';
import imginconacompanhamento from '../../assets/confiralancamentos/iconacompanhamentos.jpg';
import imglancamentos from '../../assets/confiralancamentos/lancamentos.jpg';
import { useState, useEffect } from "react";
import lanchesData from '../TelasClientes/lanches.json';

function Cardapio() {
    const [lanches, setLanches] = useState([]);

    useEffect(() => {
        setLanches(lanchesData);
    }, []);

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
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className={`produtos0${index + 1}`}>
                            <p>Duplo Carne</p>
                            <img src={imglancamentos} alt={`produto0${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='cardapio-pedidos'>
                <h1 className='cardapio-titulo'>
                    <span className="cardapio-highlight">Cardápio</span>
                </h1>
                <div className='cardapio-opcoes'>
                    <div className='lanches'>
                        {lanches.map((lanche, index) => (
                            <div key={index} className='food_body'>
                                <div className="image_div">
                                    <img src={lanche.Imagem} alt={lanche.Nome} className="image" />
                                </div>
                                <div className="food_text">
                                    <h2 className="nome_comida">{lanche.Nome}</h2>
                                    <p className="descricao">{lanche.Descricao}</p>
                                    <div className="preco">R$ {lanche.Preco}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardapio;

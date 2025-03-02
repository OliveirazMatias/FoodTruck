import "./comida.css";
import lanche from "../assets/lanche.jpg";


function Comida(){
    let nome = "X-SALADA";
    let descricao = "Hambúrguer, queijo , tomate, alface, picles e maionese.";
    let preco = "R$ 24,00";
    let imagem = lanche;

    return(
        <a href="">
            <div className="food_body">
                <div className="image_div">
                    <img src={imagem} alt="" className="image" />
                </div>
                <div className="food_text">
                    <div className="nome_comida" id="nome">{nome}</div>
                    <p className="descricao" id="descricao">{descricao}</p>
                    <div className="preco" id="preco">{preco}</div>
                </div>
            </div>
        </a>
    )
}

export default Comida;
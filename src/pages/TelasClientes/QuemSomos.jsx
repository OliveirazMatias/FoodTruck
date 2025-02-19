import '../TelasClientesCss/QuemSomos.css'; // Importando o CSS específico
import * as React from 'react';
import imgfoodtruck from '../../assets/quemsomos/foodtruck.jpg';

function QuemSomos() {
  return (
    <div className="quem-somos-tela">
      <div className='quem-somos-apresentacao'>
        <div className='quem-somos-img'>
          <img className='imgfoodtruck' src={imgfoodtruck} alt="imgfoodtruck" />
          <div className="gradiente"></div>
        </div>
        <div className='quem-somos-titulo'>
          <h1>Sanctus Panis</h1>
          <span className='quem-somos-subtitulo'>
            Encontre e peça seus pratos favoritos com facilidade.
          </span>
        </div>
      </div>
      <div className=''></div>
    </div>
  );
}

export default QuemSomos;

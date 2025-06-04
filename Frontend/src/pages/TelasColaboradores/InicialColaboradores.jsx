import React, { useState, useEffect } from 'react';
import '../TelasColaboradoresCss/InicialColaboradores.css';
import Navbar from '../../components/NavBar/navbar.jsx';
import equipeImg from '../../assets/quemsomos/foodtruck.jpeg';
import instagramIcon from '../../assets/quemsomos/instagram.png';
import whatsappIcon from '../../assets/quemsomos/wpp.png';
import clockIcon from '../../assets/quemsomos/hora.png';


function BoasVindasColaborador() {
  const [nome, setNome] = useState('Colaborador');

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nome');
    if (nomeSalvo) {
      setNome(nomeSalvo);
    }
  }, []);

    return (
        <main>
            <Navbar />
           
            <div className="quem_somos">
                <div className="boas_vindas_img">
                    <div className="img_overlay"></div>
                </div>
                <div className="quem_somos_text">
                    <h1>Bem Vindo, {nome}</h1>
                    <p>Espero que tenha um otimo dia de trabalho na <strong>Sanctus Panis</strong></p>
                </div>
            </div>
        
        </main>
    );
}

export default BoasVindasColaborador;

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
                <div className="quem_somos_img">
                    <div className="img_overlay"></div>
                </div>
                <div className="quem_somos_text">
                    <h1>Bem Vindo, {nome}</h1>
                    <p>Espero que Tenha um otimo dia de trabalho na <strong>Sanctus Panis</strong></p>
                </div>
            </div>

            <section className="quem_somos_detalhes">
                <div className="quem_somos_texto">
                    <h2>QUEM SOMOS?</h2>
                    <p>
                        O Sanctus Panis é um food truck de Guaramirim, especializado em hambúrgueres e hot dogs prensados,
                        feitos com muito carinho e ingredientes de qualidade. Estamos localizados no Bairro Vila Amizade
                        e prontos para oferecer uma experiência saborosa para você.
                    </p>
                </div>
                <div className="quem_somos_imagem">
                    <img src={equipeImg} alt="Equipe do Food Truck" className="imagem-equipe" />
                </div>
            </section>

            <div className='segundofotter'>
                <section className="appbar">
                <div className="contato">
                    <h2>CONTATO</h2>
                    <div className="contato_item">
                        <img src={instagramIcon} alt="Instagram" />
                        <span>@sanctus.panis</span>
                    </div>
                    <div className="contato_item">
                        <img src={whatsappIcon} alt="WhatsApp" />
                        <span>(47) 9 8833-6030</span>
                    </div>

                    <div className="localizacao">
                    <h2>LOCALIZAÇÃO</h2>
                    <div className="mapa_container">
                    <span>Bairro Vila Amizade R. Guaramirim - Santa Catarina</span>
                    </div>
                </div>

                    <div className="horario">
                    <h2>HORÁRIO</h2>
                    <span>De terça-feira a domingo das 18h30 as 00h</span>
                    </div>
                </div>

                
            </section> 
            </div>

        
        </main>
    );
}

export default BoasVindasColaborador;

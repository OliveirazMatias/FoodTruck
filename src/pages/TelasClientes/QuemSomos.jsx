import '../TelasClientesCss/QuemSomos.css';
import '../TelasClientesCss/QuemSomos.css';
import * as React from 'react';
import equipeImg from '../../assets/quemsomos/equipe.png';
import mapaImg from '../../assets/quemsomos/mapa.png'; // Certifique-se que a imagem do mapa está no local correto
import instagramIcon from '../../assets/quemsomos/instagram.png';
import whatsappIcon from '../../assets/quemsomos/wpp.png';
import clockIcon from '../../assets/quemsomos/hora.png';

function QuemSomos() {
    return (
        <main>
            {/* Seção Principal */}
            <div className="quem_somos">
                <div className="quem_somos_img">
                    <div className="img_overlay"></div>
                </div>
                <div className="quem_somos_text">
                    <h1>Sanctus Panis</h1>
                    <p>Encontre e peça seus pratos favoritos com facilidade.</p>
                </div>
            </div>

            {/* Seção Quem Somos */}
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

            {/* Seção Contato e Localização */}
            <section className="contato_localizacao">
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
                    <div className="contato_item">
                        <img src={clockIcon} alt="Relógio" />
                        <span>De terça-feira a domingo</span>
                    </div>
                </div>

                <div className="linha_divisoria"></div>

                <div className="localizacao">
                    <h2>LOCALIZAÇÃO</h2>
                    <div className="mapa_container">
                        <img src={mapaImg} alt="Mapa da localização" />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default QuemSomos;
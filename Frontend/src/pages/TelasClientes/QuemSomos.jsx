import '../TelasClientesCss/QuemSomos.css';
import * as React from 'react';
import equipeImg from '../../assets/quemsomos/equipe.jpeg';
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
                <div className="banner_text">
                    <h1>Sanctus Panis</h1>
                    <p>Encontre e peça seus pratos favoritos com facilidade.</p>
                </div>
            </div>

            {/* Seção Quem Somos */}
            <section className="quem_somos_detalhes">
                <div className="quem_somos_content">
                    <div className="quem_somos_texto">
                        <h2>QUEM SOMOS?</h2>
                        <p>
                            O Sanctus Panis é um food truck de Guaramirim, especializado em hambúrgueres e hot dogs prensados,
                            feitos com muito carinho e ingredientes de qualidade. Estamos localizados no Bairro Vila Amizade
                            e prontos para oferecer uma experiência saborosa para você.
                        </p>
                    </div>
                    <img className="quem_somos_imagem" src={equipeImg} alt="Equipe do Food Truck" />
                </div>
            </section>

            {/* Seção Contato e Localização */}
            <section className="contato_localizacao">
                <div className="links">
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
                    </div>

                    <div className="localizacao">
                        <h2>LOCALIZAÇÃO</h2>
                        <div className="local">
                            <span>Bairro Vila Amizade R. Guaramirim - Santa Catarina
                            </span>
                        </div>
                    </div>


                    <div className="horario">
                        <h2>HORÁRIO</h2>
                        <div className="dias">
                            <span>De terça-feira a domingo, a partir das 18h</span>
                        </div>
                    </div>
                </div>



            </section>
        </main>
    );
}

export default QuemSomos;
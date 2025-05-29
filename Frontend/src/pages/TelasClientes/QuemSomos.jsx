import '../TelasClientesCss/QuemSomos.css';
import * as React from 'react';
import equipeImg from '../../assets/quemsomos/foodtruck.jpeg';
import instagramIcon from '../../assets/quemsomos/instagram.png';
import whatsappIcon from '../../assets/quemsomos/wpp.png';
import clockIcon from '../../assets/quemsomos/hora.png';
import Navbar from '../../components/NavBar/navbar.jsx';


function QuemSomos() {
    return (
        <main>
            <Navbar />
            <div className="quem_somos">
                <div className="quem_somos_img">
                    <div className="img_overlay"></div>
                </div>
                <div className="quem_somos_text">
                    <h1>Sanctus Panis</h1>
                    <p>Encontre e peça seus pratos favoritos com facilidade.</p>
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

            <div className='fotter'>
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
                    </div>

                    <div className="linha_divisoria"></div>

                    <div className="localizacao">
                        <h2>LOCALIZAÇÃO</h2>
                        <div className="mapa_container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.397085571266!2d-50.20017432382862!3d-22.110830909911872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94959cda59fb90a7%3A0xac4e61b3ec869988!2sSENAI%20Pomp%C3%A9ia!5e0!3m2!1spt-BR!2sbr!4v1748519475475!5m2!1spt-BR!2sbr"
                                width="80%"
                                height="250"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        <div className="horario">
                            <h2>HORÁRIO</h2>
                            <span>De terça-feira a domingo das 18h30 às 00h</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default QuemSomos;
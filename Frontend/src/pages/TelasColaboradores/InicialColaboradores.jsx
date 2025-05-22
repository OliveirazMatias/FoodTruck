import React, { useState, useEffect } from 'react';
import '../TelasColaboradoresCss/InicialColaboradores.css';
import Navbar from '../../components/NavBar/navbar.jsx';
import equipe from '../../assets/inicialcolaboradores/equipe.jpg';

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

      {/* Seção de Boas-Vindas */}
      <div className="boas_vindas">
        <div className="boas_vindas_img">
          <div className="img_overlay"></div>
        </div>
        <div className="boas_vindas_texto">
          <h1>Bem-vindo(a), {nome}!</h1>
          <p>Que bom ter você com a gente na <strong>Sanctus Panis</strong>.</p>
          <p>Desejamos um dia de trabalho produtivo, cheio de sabor e sucesso!</p>
        </div>
      </div>

      {/* Seção sobre a empresa */}
      <section className="sobre_empresa">
        <div className="texto_empresa">
          <h2>SOBRE NÓS</h2>
          <p>
            Aqui na <strong>Sanctus Panis</strong>, somos mais do que um food truck — somos uma família unida pelo amor à comida e ao atendimento com excelência.
            Nossos hambúrgueres e hot dogs são preparados com dedicação, ingredientes de qualidade e aquele toque especial.
          </p>
          <p>
            Cada colaborador é peça fundamental no nosso sucesso. Contamos com você pra continuar fazendo história com a gente!
          </p>
        </div>
        <div className="imagem_equipe">
          <img src={equipe} alt="Equipe do Food Truck" className="imagem-equipe" />
        </div>
      </section>

      {/* Seção com informações úteis */}
      <section className="informacoes_gerais">
        <div className="contatos_uteis">
          <h2>CONTATOS ÚTEIS</h2>
          <div className="contato_item">
            <span>Instagram: @sanctus.panis</span>
          </div>
          <div className="contato_item">
            <span>WhatsApp da Equipe: (47) 9 8833-6030</span>
          </div>
          <div className="contato_item">
            <span>Funcionamento: Terça a Domingo</span>
          </div>
        </div>

        <div className="linha_divisoria"></div>

        <div className="localizacao">
          <h2>ONDE ESTAMOS</h2>
          <div className="mapa_container">
            <p>Rua Exemplo, Bairro Vila Amizade - Guaramirim, SC</p>
            {/* <img src={mapaImg} alt="Mapa da localização" /> */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default BoasVindasColaborador;

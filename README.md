# Sanctus Panis - Sistema de Gestão para Food Truck

Este projeto é um sistema completo para a gestão de um food truck, desenvolvido com uma arquitetura de frontend e backend. Ele permite gerenciar cardápio, pedidos, funcionários e estoque, além de oferecer uma interface para clientes visualizarem o cardápio e realizarem pedidos.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Backend
- **Tecnologias**: Node.js, Express, Sequelize, MySQL.
- **Funcionalidades**:
  - Gerenciamento de cardápio (CRUD de itens).
  - Gerenciamento de pedidos e itens do pedido.
  - Autenticação e cadastro de funcionários com JWT.
  - Integração com banco de dados MySQL.
- **Localização**: Diretório `Backend/`.

### Frontend
- **Tecnologias**: React, Vite.
- **Funcionalidades**:
  - Exibição do cardápio para clientes.
  - Modal para adicionar itens ao carrinho.
  - Navegação entre páginas.
- **Localização**: Diretório `Frontend/`.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:
- Node.js
- MySQL
- Gerenciador de pacotes (npm ou yarn)


ESSE SITE UTILIZA .env

MYSQL_HOST= *localhost, padrão=127.0.0.1*
MYSQL_PORT= *porta do mysql padrão=3306*
MYSQL_USER= *usuario do mysql*
MYSQL_PASSWORD= *senha do mysql*
MYSQL_DATABASE= *nome da database padrão=foodtruck*
JWT_SECRET= *Sua Chave Secreta para Criptografar*

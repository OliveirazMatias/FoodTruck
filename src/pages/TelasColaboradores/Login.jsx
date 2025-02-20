import React from 'react';
import '../TelasColaboradoresCss/Login.css';

function Login() {
    return (
        <div className="forms-container">
            <div className='forms-conteudo'>
                <h1 className='titulo'>LOGIN ADM</h1>
                <div className='preencher'>
                    <input type="text" placeholder="Login" className='input-login' />
                    <input type="password" placeholder="Senha" className='input-senha' />
                    <button className='botao-login'>Entrar</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
import React, { useState } from 'react';
import '../TelasColaboradoresCss/Login.css';
import { postLogin } from '../../Services/api.js';
import Navbar from '../../components/NavBar/navbar.jsx';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await postLogin({ email, senha }); 
            console.log('Login Bem-Sucedido: ', response);
            localStorage.setItem('token', response.token);
            window.location.href = '/';
        } catch (error) {
            console.error('Erro no login: ', error);
            setError('Login ou senha inválidos');
        }
    };

    return (
        <div className="forms-container">
            <Navbar />
            <div className='forms-conteudo'>
                <h1 className='titulo-login'>LOGIN ADM</h1>
                <div className='preencher-forms'>
                    <input
                        type="text"
                        placeholder="Email"
                        className="input-login"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="input-senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button className='botao-login' onClick={handleLogin}>Entrar</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;
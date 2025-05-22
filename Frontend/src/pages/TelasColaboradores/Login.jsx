import React, { useState } from 'react';
import '../TelasColaboradoresCss/Login.css';
import { postLogin } from '../../Services/api.js';
import Navbar from '../../components/NavBar/navbar.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await postLogin({ email, senha });

            console.log('Login Bem-Sucedido:', response);

            localStorage.setItem('token', response.token);
            localStorage.setItem('tipo_funcionario', response.tipo_funcionario);
            localStorage.setItem('nome', response.nome);

            if (response.token) {
                if (response.tipo_funcionario === 'Administrador') {
                    window.location.href = '/addlanche';
                } else if (response.tipo_funcionario === 'Funcionario') {
                    window.location.href = '/colaboradoresinicial';
                } else {
                    setError('Tipo de usuário inválido');
                }
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setError('Login ou senha inválidos');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="forms-container">
            <Navbar /> {/* Tá aqui, no topo, firme e forte */}
            <div className="forms-conteudo">
                <h1 className="titulo-login">LOGIN ADM</h1>
                <div className="preencher-forms">
                    <input
                        type="text"
                        placeholder="Email"
                        className="input-login"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="senha-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Senha"
                            className="input-senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            className="botao-visualizar-senha"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </button>
                    </div>

                    <button className="botao-login" onClick={handleLogin}>
                        Entrar
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;

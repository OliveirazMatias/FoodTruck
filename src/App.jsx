import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cardapio from './pages/TelasClientes/Cardapio';
import Carrinho from './pages/TelasClientes/Carrinho';
import Pedidos from './pages/TelasClientes/Pedidos';
import Comida from './components/comida';
import './App.css';
import imglogo from './assets/logo/logo.png';

function App() {
  return (
    <Router>
        <header className="header">
          <nav>
            <img className="logo" src={imglogo} alt="logo" />
            <Link to="/" className="nav-link">CARDÁPIO</Link>
            <Link to="/pedidos" className="nav-link">QUEM SOMOS</Link>
            <Link to="/carrinho" className="nav-link">CARRINHO</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Comida />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
    </Router>
  );
}

export default App;

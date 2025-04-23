import React from 'react';
import '../TelasColaboradoresCss/Comandas.css';

function Comandas() {
    const mesas = [
        { id: 1, status: 'livre' },
        { id: 2, status: 'ocupada' },
        { id: 3, status: 'livre' },
        { id: 4, status: 'livre' },
        { id: 5, status: 'ocupada' },
        { id: 6, status: 'livre' },
    ];

    return (
        <div className="comandas-container">
            <div className='comandas'>
                <div className='titulo-comandas'>
                    <h1 className='titulo'>Comandas</h1>
                </div>
                <div className='mesas-container'>
                    <div className='mesas'>
                        {mesas.map((mesa) => (
                            <div key={mesa.id} className='div-buttao'>
                                <button
                                    className={`mesas-button ${mesa.status === 'ocupada' ? 'mesas-button-amarelo' : ''}`}
                                >
                                    Mesa {mesa.id}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comandas;
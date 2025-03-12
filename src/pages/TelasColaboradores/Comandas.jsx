import React from 'react';
import '../TelasColaboradoresCss/Comandas.css';

function Comandas() {
    return (
        <div className="comandas-container">
            <div className='comandas'>
                <div className='titulo-comandas'>
                    <h1 className='titulo'>Comandas</h1>
                </div>
                <div className='mesas-container'>
                    <div className='mesas'>
                        <div className='buttons'>
                            <div className='div-buttao'>
                                <button className='mesas-button'>Mesa 1</button>
                            </div>
                            <div className='div-buttao'>
                                <button className='mesas-button'>Mesa 4</button>
                            </div>
                        </div>
                        <div className='buttons'>
                            <div className='div-buttao'>
                                <button className='mesas-button-amarelo'>Mesa 2</button>
                            </div>
                            <div className='div-buttao'>
                                <button className='mesas-button-amarelo'>Mesa 5</button>
                            </div>
                        </div>
                        <div className='buttons'>
                            <div className='div-buttao'>
                                <button className='mesas-button'>Mesa 3</button>
                            </div>
                            <div className='div-buttao'>
                                <button className='mesas-button'>Mesa 6</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comandas;
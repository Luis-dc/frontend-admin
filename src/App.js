// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login'; 
import Register from './componentes/Register'; 
import GestionInventario from './componentes/GestionInventario'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [token, setToken] = useState(''); // Estado para manejar el token

    const handleLogin = (token) => {
        setToken(token); // Función para establecer el token al iniciar sesión
    };

    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Gestión de Inventario</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {token ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/" onClick={() => setToken('')}>Cerrar Sesión</a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Inicio de Sesión</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">Registrar</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>

                <div className="container mt-5">
                    <Routes>
                        <Route path="/" element={token ? <GestionInventario token={token} /> : <Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register />} /> {/* Ruta para el componente Register */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

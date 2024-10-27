// src/componentes/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores anteriores
        setSuccess(''); // Limpiar mensajes de éxito anteriores

        try {
            const response = await axios.post('http://18.219.186.24:3000/api/admin/register', {
                user,
                password,
            });

            if (response.status === 201) {
                setSuccess('Administrador registrado con éxito.');
                setUser(''); // Limpiar el campo de usuario
                setPassword(''); // Limpiar el campo de contraseña
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            setError('Error al registrar el administrador.');
        }
    };

    return (
        <div className="register-container">
            <h2>Registrar Administrador</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
};

export default Register;

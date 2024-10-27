// src/componentes/InsertarProducto.js
import React, { useState } from 'react';
import axios from 'axios';

const InsertarProducto = ({ token }) => { // Asegúrate de recibir 'token' como prop
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [id_categoria, setIdCategoria] = useState('');
    const [stock, setStock] = useState('');
    const [imagen_url, setImagenUrl] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(''); // Limpiar el mensaje

        try {
            const response = await axios.post('http://18.219.186.24:3000/api/admin/productos', {
                nombre,
                descripcion,
                precio,
                id_categoria,
                stock,
                imagen_url,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Usar el token recibido como prop
                }
            });

            setMensaje(response.data.message); // Mostrar mensaje de éxito
        } catch (error) {
            console.error('Error al insertar producto:', error);
            setMensaje('Error al insertar producto.');
        }
    };

    return (
        <div className="insertar-producto-container">
            <h2>Insertar Producto</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ID Categoría</label>
                    <input
                        type="text"
                        className="form-control"
                        value={id_categoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Imagen URL</label>
                    <input
                        type="text"
                        className="form-control"
                        value={imagen_url}
                        onChange={(e) => setImagenUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Insertar Producto</button>
            </form>
        </div>
    );
};

export default InsertarProducto;

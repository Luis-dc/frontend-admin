import React, { useState } from 'react';
import axios from 'axios';

const FormularioInsertar = ({ token }) => {
    // Estados para manejar los campos del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [idCategoria, setIdCategoria] = useState(''); // Aquí puedes mantener 'idCategoria' o cambiarlo a 'id_categoria' si prefieres
    const [stock, setStock] = useState('');
    const [imagenUrl, setImagenUrl] = useState(''); // 'imagen_url' es válido
    const [mensaje, setMensaje] = useState('');

    // Función para manejar el envío del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setMensaje(''); // Limpiar mensaje antes de nuevo intento

        try {
            // Crear el objeto del producto
            const nuevoProducto = {
                nombre,
                descripcion,
                precio: parseFloat(precio), // Asegúrate de que sea un número
                id_categoria: parseInt(idCategoria), // Convertir a entero
                stock: parseInt(stock), // Convertir a entero
                imagen_url: imagenUrl,
            };

            // Realizar la solicitud POST para insertar el producto
            const response = await axios.post('http://18.219.186.24:3000/api/admin/productos', nuevoProducto, {
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, // Usar el token recibido
            });

            setMensaje('Producto insertado con éxito!');
            // Resetear los campos del formulario
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setIdCategoria('');
            setStock('');
            setImagenUrl('');
        } catch (error) {
            console.error('Error al insertar el producto:', error);
            setMensaje('Error al insertar el producto. Intenta de nuevo.');
        }
    };

    return (
        <div>
            <h3>Insertar Producto</h3>
            <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">ID Categoría</label>
                    <input
                        type="number"
                        className="form-control"
                        value={idCategoria} // Aquí puedes mantener 'idCategoria'
                        onChange={(e) => setIdCategoria(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL de la imagen</label>
                    <input
                        type="text"
                        className="form-control"
                        value={imagenUrl} // Cambié 'imagen_url' por 'imagenUrl' aquí, pero el valor se envía como 'imagen_url' en el backend
                        onChange={(e) => setImagenUrl(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Insertar Producto</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
};

export default FormularioInsertar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioInsertar from './FormularioInsertar'; // Asegúrate de que la ruta sea correcta
import ActualizarProducto from './ActualizarProducto';
import Pedidos from './Pedidos';

const GestionInventario = () => {
    const [vista, setVista] = useState('');
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (vista === 'ver') {
            obtenerProductos();
        }
    }, [vista]);

    const obtenerProductos = async () => {
        try {
            const response = await axios.get('http://18.219.186.24:3000/api/data', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos', error);
        }
    };

    const cambiarVista = (nuevaVista) => {
        setVista(nuevaVista);
    };

    const renderVista = () => {
        switch (vista) {
            case 'insertar':
                return <FormularioInsertar />; // Asegúrate de que esto es correcto
            case 'ver':
                return <VerInventario productos={productos} />;
            case 'actualizar':
                return <ActualizarProducto />;
            case 'eliminar':
                return <Pedidos />;
            default:
                return <p>Seleccione una opción.</p>;
        }
    };

    return (
        <div className="container mt-5">
            <h2>Gestión de Inventario</h2>
            <div className="btn-group mb-3" role="group">
                <button className="btn btn-secondary" onClick={() => cambiarVista('insertar')}>Insertar Productos</button>
                <button className="btn btn-secondary" onClick={() => cambiarVista('ver')}>Ver Inventario</button>
                <button className="btn btn-secondary" onClick={() => cambiarVista('actualizar')}>Actualizar</button>
                <button className="btn btn-secondary" onClick={() => cambiarVista('eliminar')}>Ver Pedidos</button>
            </div>
            <div>
                {renderVista()}
            </div>
        </div>
    );
};

const VerInventario = ({ productos }) => (
    <div>
        <h3>Lista del inventario de productos</h3>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                    <tr key={producto.id_producto}>
                        <td>{producto.id_producto}</td>
                        <td>{producto.nombre}</td>
                        <td>${parseFloat(producto.precio).toFixed(2)}</td>
                        <td>{producto.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);




const EliminarProducto = () => <div>Formulario para eliminar productos</div>;

export default GestionInventario;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get('http://18.219.186.24:3000/api/admin/productos/pedidos');
                setPedidos(response.data);
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
                setError('Error al cargar los pedidos.');
            } finally {
                setCargando(false);
            }
        };

        fetchPedidos();
    }, []);

    return (
        <div>
            <h2>Lista de Pedidos</h2>
            {cargando ? (
                <p>Cargando pedidos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>Fecha Venta</th>
                            <th>Total</th>
                            <th>Dirección de Envío</th>
                            <th>Nombre del Producto</th>
                            <th>Nombre del Cliente</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id_venta}>
                                <td>{pedido.id_venta}</td>
                                <td>{new Date(pedido.fecha_venta).toLocaleString()}</td>
                                <td>{parseFloat(pedido.total).toFixed(2)}</td>
                                <td>{pedido.direccion_envio}</td>
                                <td>{pedido.Nombre_Producto}</td>
                                <td>{pedido.Nombre_Cliente}</td>
                                <td>{pedido.cantidad}</td>
                                <td>{parseFloat(pedido.precio_unitario).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Pedidos;

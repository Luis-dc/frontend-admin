import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActualizarProducto = () => {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: '',
        descripcion: '',
        id_categoria: '',
        imagen_url: '',
    });

    useEffect(() => {
        obtenerProductos();
    }, []);

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

    const seleccionarProducto = (producto) => {
        setProductoSeleccionado(producto);
        setFormData({
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            descripcion: producto.descripcion || '', // Asegúrate de que el producto tenga este campo
            id_categoria: producto.id_categoria || '', // Asegúrate de que el producto tenga este campo
            imagen_url: producto.imagen_url || '', // Asegúrate de que el producto tenga este campo
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const actualizarProducto = async () => {
        if (!productoSeleccionado) {
            console.error('No hay producto seleccionado para actualizar.');
            return;
        }

        try {
            const { nombre, precio, stock, descripcion, id_categoria, imagen_url } = formData;
            const id_producto = productoSeleccionado.id_producto;

            const datosActualizados = {
                nombre,
                precio,
                stock,
                descripcion,
                id_categoria,
                imagen_url,
            };

            const response = await axios.put(`http://18.219.186.24:3000/api/admin/productos/${id_producto}`, datosActualizados);
            console.log(response.data.message);
            obtenerProductos(); // Recargar productos para reflejar los cambios
            setProductoSeleccionado(null); // Resetear selección
            setFormData({ nombre: '', precio: '', stock: '', descripcion: '', id_categoria: '', imagen_url: '' }); // Resetear formulario
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    return (
        <div>
            <h3>Actualizar Producto</h3>
            {productoSeleccionado ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    actualizarProducto();
                }}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio</label>
                        <input
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>ID Categoría</label>
                        <input
                            type="text"
                            name="id_categoria"
                            value={formData.id_categoria}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>URL de Imagen</label>
                        <input
                            type="text"
                            name="imagen_url"
                            value={formData.imagen_url}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Actualizar</button>
                    <button type="button" className="btn btn-secondary mt-3" onClick={() => setProductoSeleccionado(null)}>Cancelar</button>
                </form>
            ) : (
                <div>
                    <h4>Selecciona un producto para actualizar</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id_producto}>
                                    <td>{producto.id_producto}</td>
                                    <td>{producto.nombre}</td>
                                    <td>${parseFloat(producto.precio).toFixed(2)}</td>
                                    <td>{producto.stock}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => seleccionarProducto(producto)}
                                        >
                                            Actualizar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ActualizarProducto;

import { useEffect, useState } from 'react';
import { eliminarProducto, obtenerCarrito, vaciarCarrito } from '@api/carritoStorage';
import { imagenes } from '@assets/imagenes';
import Boton from '@components/Boton';
import Tarjeta from '@components/Tarjeta';

const Carrito = () => {
    const [carrito, setCarrito] = useState(obtenerCarrito);

    useEffect(() => {
        const sincronizarCarrito = () => setCarrito(obtenerCarrito());
        window.addEventListener('storage', sincronizarCarrito);

        return () => window.removeEventListener('storage', sincronizarCarrito);
    }, []);

    const manejarEliminar = (idCarrito) => {
        setCarrito(eliminarProducto(idCarrito));
    };

    const manejarVaciar = () => {
        if (confirm('¿Querés vaciar el carrito?')) {
            vaciarCarrito();
            setCarrito([]);
        }
    };

    const total = carrito.reduce((suma, producto) => suma + producto.precioFinal, 0);

    return (
        <section className="contenedor" aria-labelledby="titulo-carrito">
            <h2 className="titulo-seccion" id="titulo-carrito">Tu Carrito</h2>
            {carrito.length === 0 ? (
                <p className="mensaje-vacio">El carrito está vacío.</p>
            ) : (
                <div className="lista-carrito">
                    {carrito.map((producto) => (
                        <Tarjeta key={producto.idCarrito} clase="producto-carrito">
                            <img
                                src={imagenes[producto.imagen]}
                                alt={`Hamburguesa ${producto.nombre}`}
                            />
                            <div>
                                <h3>{producto.nombre}</h3>
                                <p>Medallones: {producto.medallones}</p>
                                {producto.papas && <p>Con papas</p>}
                                {producto.bebida && <p>Con bebida</p>}
                                <p className="precio">${producto.precioFinal}</p>
                            </div>
                            <Boton variante="peligro" onClick={() => manejarEliminar(producto.idCarrito)}>
                                Eliminar
                            </Boton>
                        </Tarjeta>
                    ))}
                </div>
            )}
            <div className="resumen-carrito">
                <p className="total-carrito">Total de la compra: ${total}</p>
                {carrito.length > 0 && (
                    <Boton variante="peligro" onClick={manejarVaciar}>Vaciar carrito</Boton>
                )}
            </div>
        </section>
    );
};

export default Carrito;

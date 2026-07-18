import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerHamburguesas } from '@api/burgerApi';
import { agregarProducto } from '@api/carritoStorage';
import { imagenes } from '@assets/imagenes';
import Boton from '@components/Boton';
import TarjetaHamburguesa from '@components/TarjetaHamburguesa';

const Menu = () => {
    const [hamburguesas, setHamburguesas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cargarHamburguesas = async () => {
            try {
                setHamburguesas(await obtenerHamburguesas());
            } catch (errorCarga) {
                setError(errorCarga.message);
            } finally {
                setCargando(false);
            }
        };

        cargarHamburguesas();
    }, []);

    const agregarAlCarrito = (hamburguesa, medallones, papas, bebida) => {
        const precioFinal = hamburguesa.precio
            + ((medallones - 1) * 200)
            + (papas ? 100 : 0)
            + (bebida ? 100 : 0);
        const producto = {
            idCarrito: `${Date.now()}-${crypto.randomUUID()}`,
            idProducto: hamburguesa.id,
            nombre: hamburguesa.nombre,
            imagen: hamburguesa.imagen,
            medallones,
            papas,
            bebida,
            precioFinal
        };

        agregarProducto(producto);
        setMensaje(`${hamburguesa.nombre} fue agregada al carrito.`);
    };

    return (
        <section className="contenedor" aria-labelledby="titulo-menu">
            <h2 className="titulo-seccion" id="titulo-menu">Nuestras Hamburguesas</h2>
            <div className="notificacion" aria-live="polite">
                {mensaje && (
                    <>
                        <p>{mensaje}</p>
                        <Boton onClick={() => navigate('/carrito')}>Ver carrito</Boton>
                    </>
                )}
            </div>
            {cargando && <p className="mensaje-estado">Cargando hamburguesas...</p>}
            {error && <p className="mensaje-estado mensaje-estado--error" role="alert">{error}</p>}
            {!cargando && !error && (
                <div className="grilla">
                    {hamburguesas.map((hamburguesa) => (
                        <TarjetaHamburguesa
                            key={hamburguesa.id}
                            hamburguesa={hamburguesa}
                            imagen={imagenes[hamburguesa.imagen]}
                            onAgregar={agregarAlCarrito}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Menu;

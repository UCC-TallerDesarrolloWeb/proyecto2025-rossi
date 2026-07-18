import { useEffect, useState } from 'react';
import { obtenerSucursales } from '@api/burgerApi';
import { imagenes } from '@assets/imagenes';
import Tarjeta from '@components/Tarjeta';

const Sucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarSucursales = async () => {
            try {
                setSucursales(await obtenerSucursales());
            } catch (errorCarga) {
                setError(errorCarga.message);
            } finally {
                setCargando(false);
            }
        };

        cargarSucursales();
    }, []);

    return (
        <section className="contenedor" aria-labelledby="titulo-sucursales">
            <h2 className="titulo-seccion" id="titulo-sucursales">Nuestras Sucursales</h2>
            {cargando && <p className="mensaje-estado">Cargando sucursales...</p>}
            {error && <p className="mensaje-estado mensaje-estado--error" role="alert">{error}</p>}
            {!cargando && !error && (
                <div className="grilla">
                    {sucursales.map((sucursal) => (
                        <Tarjeta key={sucursal.id} clase="sucursal">
                            <img
                                className="tarjeta__imagen"
                                src={imagenes[sucursal.imagen]}
                                alt={`Vista de la ciudad de ${sucursal.ciudad}`}
                            />
                            <div className="tarjeta__contenido">
                                <h3>{sucursal.ciudad}</h3>
                                <p>{sucursal.direccion}</p>
                            </div>
                        </Tarjeta>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Sucursales;

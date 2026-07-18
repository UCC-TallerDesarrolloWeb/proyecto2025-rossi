import { useEffect, useState } from 'react';
import { obtenerHamburguesas } from '@api/burgerApi';
import { imagenes } from '@assets/imagenes';
import Tarjeta from '@components/Tarjeta';

const Home = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarEspecialidades = async () => {
            try {
                const hamburguesas = await obtenerHamburguesas();
                setEspecialidades(hamburguesas.filter((hamburguesa) => hamburguesa.id <= 3));
            } catch (errorCarga) {
                setError(errorCarga.message);
            } finally {
                setCargando(false);
            }
        };

        cargarEspecialidades();
    }, []);

    return (
        <>
            <section className="hero" aria-labelledby="titulo-hero">
                <img
                    src={imagenes['principal-burg.jpg']}
                    alt="Hamburguesa doble con queso y vegetales"
                />
                <div className="hero__capa">
                    <h2 id="titulo-hero">Las mejores hamburguesas del país</h2>
                </div>
            </section>
            <section className="contenedor" aria-labelledby="titulo-especialidades">
                <h2 className="titulo-seccion" id="titulo-especialidades">
                    Nuestras Especialidades
                </h2>
                {cargando && <p className="mensaje-estado">Cargando especialidades...</p>}
                {error && <p className="mensaje-estado mensaje-estado--error" role="alert">{error}</p>}
                {!cargando && !error && (
                    <div className="grilla">
                        {especialidades.map((hamburguesa) => (
                            <Tarjeta key={hamburguesa.id}>
                                <img
                                    className="tarjeta__imagen"
                                    src={imagenes[hamburguesa.imagen]}
                                    alt={`Hamburguesa ${hamburguesa.nombre}`}
                                />
                                <div className="tarjeta__contenido">
                                    <h3>{hamburguesa.nombre}</h3>
                                    <p>{hamburguesa.descripcion}</p>
                                </div>
                            </Tarjeta>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default Home;

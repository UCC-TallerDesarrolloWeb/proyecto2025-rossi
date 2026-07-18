import { useState } from 'react';
import Boton from '@components/Boton';
import Tarjeta from '@components/Tarjeta';

const TarjetaHamburguesa = ({ hamburguesa, imagen, onAgregar }) => {
    const [medallones, setMedallones] = useState(1);
    const [papas, setPapas] = useState(false);
    const [bebida, setBebida] = useState(false);
    const sufijo = `hamburguesa-${hamburguesa.id}`;

    const manejarAgregar = () => {
        onAgregar(hamburguesa, medallones, papas, bebida);
    };

    return (
        <Tarjeta>
            <img
                className="tarjeta__imagen"
                src={imagen}
                alt={`Hamburguesa ${hamburguesa.nombre}`}
            />
            <div className="tarjeta__contenido">
                <h3>{hamburguesa.nombre}</h3>
                <p>{hamburguesa.descripcion}</p>
                <p className="precio">${hamburguesa.precio}</p>
                <div className="opciones">
                    <div className="campo-select">
                        <label htmlFor={`medallones-${sufijo}`}>Medallones</label>
                        <select
                            id={`medallones-${sufijo}`}
                            value={medallones}
                            onChange={(evento) => setMedallones(Number(evento.target.value))}
                        >
                            <option value="1">1 medallón</option>
                            <option value="2">2 medallones</option>
                            <option value="3">3 medallones</option>
                        </select>
                    </div>
                    <div className="opcion-check">
                        <input
                            id={`papas-${sufijo}`}
                            type="checkbox"
                            checked={papas}
                            onChange={(evento) => setPapas(evento.target.checked)}
                        />
                        <label htmlFor={`papas-${sufijo}`}>Agregar papas (+$100)</label>
                    </div>
                    <div className="opcion-check">
                        <input
                            id={`bebida-${sufijo}`}
                            type="checkbox"
                            checked={bebida}
                            onChange={(evento) => setBebida(evento.target.checked)}
                        />
                        <label htmlFor={`bebida-${sufijo}`}>Agregar bebida (+$100)</label>
                    </div>
                    <Boton onClick={manejarAgregar}>Agregar al carrito</Boton>
                </div>
            </div>
        </Tarjeta>
    );
};

export default TarjetaHamburguesa;

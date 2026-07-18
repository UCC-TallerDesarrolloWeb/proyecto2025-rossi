import { useState } from 'react';
import Boton from '@components/Boton';
import CampoFormulario from '@components/CampoFormulario';

const valoresIniciales = {
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    mensaje: ''
};

const validarCampo = (nombre, valor) => {
    const valorLimpio = valor.trim();

    if (nombre === 'nombre' && !valorLimpio) return 'Ingresá tu nombre.';
    if (nombre === 'apellido' && !valorLimpio) return 'Ingresá tu apellido.';
    if (nombre === 'telefono' && valorLimpio && !/^[0-9\s()-]+$/.test(valor)) {
        return 'El teléfono solo puede contener números, espacios, guiones o paréntesis.';
    }
    if (nombre === 'correo' && !valorLimpio) return 'Ingresá tu correo electrónico.';
    if (nombre === 'correo' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        return 'Ingresá un correo electrónico válido.';
    }
    if (nombre === 'mensaje' && !valorLimpio) return 'Ingresá un mensaje.';
    return '';
};

const Contacto = () => {
    const [formulario, setFormulario] = useState(valoresIniciales);
    const [errores, setErrores] = useState({});
    const [mensajeGeneral, setMensajeGeneral] = useState('');

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setFormulario((valores) => ({ ...valores, [name]: value }));
        setErrores((erroresActuales) => ({
            ...erroresActuales,
            [name]: validarCampo(name, value)
        }));
        setMensajeGeneral('');
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        const nuevosErrores = Object.keys(formulario).reduce((resultado, nombre) => {
            const error = validarCampo(nombre, formulario[nombre]);
            return error ? { ...resultado, [nombre]: error } : resultado;
        }, {});

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            setMensajeGeneral('Revisá los campos señalados.');
            return;
        }

        setFormulario(valoresIniciales);
        setErrores({});
        setMensajeGeneral('Mensaje enviado correctamente.');
    };

    return (
        <section className="contenedor" aria-labelledby="titulo-contacto">
            <h2 className="titulo-seccion" id="titulo-contacto">Contacto</h2>
            <p className="intro-contacto">
                ¡Nos encanta saber de vos! Dejanos tu mensaje y te responderemos a la brevedad.
            </p>
            <form className="formulario-contacto" onSubmit={manejarEnvio} noValidate>
                <CampoFormulario
                    id="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    placeholder="Tu nombre"
                    maxLength={40}
                    error={errores.nombre}
                />
                <CampoFormulario
                    id="apellido"
                    label="Apellido"
                    value={formulario.apellido}
                    onChange={manejarCambio}
                    placeholder="Tu apellido"
                    maxLength={40}
                    error={errores.apellido}
                />
                <CampoFormulario
                    id="telefono"
                    label="Teléfono"
                    type="tel"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                    placeholder="Ej: 11 1234 5678"
                    maxLength={25}
                    error={errores.telefono}
                />
                <CampoFormulario
                    id="correo"
                    label="Correo electrónico"
                    type="email"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    placeholder="tu@email.com"
                    error={errores.correo}
                />
                <CampoFormulario
                    id="mensaje"
                    label="Mensaje"
                    value={formulario.mensaje}
                    onChange={manejarCambio}
                    placeholder="¿En qué podemos ayudarte?"
                    maxLength={500}
                    error={errores.mensaje}
                    esTextarea
                />
                <div className="mensaje-formulario" aria-live="polite">
                    {mensajeGeneral}
                </div>
                <Boton tipo="submit">ENVIAR</Boton>
            </form>
        </section>
    );
};

export default Contacto;

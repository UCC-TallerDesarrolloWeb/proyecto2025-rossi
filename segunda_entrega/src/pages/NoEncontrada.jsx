import { useNavigate } from 'react-router-dom';
import Boton from '@components/Boton';

const NoEncontrada = () => {
    const navigate = useNavigate();

    return (
        <section className="contenedor pagina-no-encontrada">
            <h2 className="titulo-seccion">Página no encontrada</h2>
            <p>La página que buscás no existe.</p>
            <Boton onClick={() => navigate('/')}>Volver al inicio</Boton>
        </section>
    );
};

export default NoEncontrada;

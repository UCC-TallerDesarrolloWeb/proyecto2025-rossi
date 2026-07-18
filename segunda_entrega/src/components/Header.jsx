import { NavLink } from 'react-router-dom';

const obtenerClaseEnlace = ({ isActive }) =>
    isActive ? 'navegacion__enlace navegacion__enlace--activo' : 'navegacion__enlace';

const Header = () => {
    return (
        <header className="cabecera">
            <div className="cabecera__contenido">
                <NavLink className="cabecera__marca" to="/">
                    <img src="/imagenes/logo.png" alt="Logo de Burger House" />
                    <h1>
                        Burger
                        <br />
                        House
                    </h1>
                </NavLink>
                <nav className="navegacion" aria-label="Navegación principal">
                    <ul>
                        <li><NavLink className={obtenerClaseEnlace} to="/" end>Home</NavLink></li>
                        <li><NavLink className={obtenerClaseEnlace} to="/menu">Menú</NavLink></li>
                        <li><NavLink className={obtenerClaseEnlace} to="/sucursales">Sucursales</NavLink></li>
                        <li><NavLink className={obtenerClaseEnlace} to="/contacto">Contacto</NavLink></li>
                        <li><NavLink className={obtenerClaseEnlace} to="/carrito">Carrito</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

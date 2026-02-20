import { Link } from "react-router-dom";

const LOGO_SRC = "/imagenes/logo.png";

const Header = () => {
  return (
    <header id="main-header">
      <div className="logo">
        <img src={LOGO_SRC} alt="Logo Burger House" />
        <h1>Burger House</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menú</Link>
          </li>
          <li>
            <Link to="/sucursales">Sucursales</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/carrito">Carrito</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

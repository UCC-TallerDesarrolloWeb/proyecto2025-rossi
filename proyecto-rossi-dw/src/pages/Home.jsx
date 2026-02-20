import { Link } from "react-router-dom";
import { productos } from "@utils/funciones";
import "@styles/main.scss";

const Home = () => {
  const especialidades = productos.slice(0, 3);

  return (
    <>
      <section className="principal">
        <div className="principal-text">
          <h2>Las mejores hamburguesas del país</h2>
        </div>
      </section>

      <section className="section">
        <h2>Nuestras Especialidades</h2>
        <div className="grid">
          {especialidades.map((p) => (
            <div key={p.nombre} className="card">
              <Link to="/menu">
                <img src={p.imagen} alt={`Hamburguesa ${p.nombre}`} />
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;

// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Importamos solo el array de productos desde utilidades
import { productos } from '@utils/funciones'; 

// Importa el alias de estilos
import '@styles/main.scss';

const Home = () => {
  // Tomamos solo los primeros 3 productos para la sección "Especialidades"
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
          {especialidades.map((p, index) => (
            <div key={index} className="card">
              <Link to="/menu">
                {/* Usamos p.imagen que es la referencia correcta importada en funciones.js */}
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
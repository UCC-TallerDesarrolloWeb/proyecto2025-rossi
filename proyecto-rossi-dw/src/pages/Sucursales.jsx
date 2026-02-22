import { useState, useEffect } from "react";
import "@styles/main.scss";

const Sucursales = () => {
  const [sucursalesData, setSucursalesData] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setSucursalesData(data.sucursales))
      .catch((err) => console.error("Error al cargar:", err));
  }, []);

  return (
    <section className="section">
      <h2>Nuestras Sucursales</h2>
      <div className="grid">
        {sucursalesData.map((sucursal) => (
          <div key={sucursal.id} className="card sucursal">
            <img src={sucursal.imagen} alt={sucursal.nombre} />
            <h3>{sucursal.nombre}</h3>
            <p>{sucursal.direccion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sucursales;

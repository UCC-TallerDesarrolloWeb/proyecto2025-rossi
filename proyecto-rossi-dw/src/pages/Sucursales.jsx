import { useState, useEffect } from "react";
import "@styles/main.scss";

const Sucursales = () => {
  const [sucursalesData, setSucursalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSucursales = async () => {
    try {
      setLoading(true);
      const response = await fetch("/db.json");

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setSucursalesData(data.sucursales);
      setError(null);
    } catch {
      setError("No se pudieron cargar los datos de las sucursales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSucursales();
  }, []);

  if (loading) {
    return (
      <section className="section sucursales">
        <h2>Cargando Sucursales... 🍔</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section sucursales">
        <h2>Error al cargar</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="section sucursales">
      <h2>Nuestras Sucursales</h2>
      <div className="grid">
        {sucursalesData.map((sucursal) => (
          <div key={sucursal.id} className="card sucursal">
            <img src={sucursal.imagen} alt={`Sucursal ${sucursal.nombre}`} />
            <h3>{sucursal.nombre}</h3>
            <p>{sucursal.direccion}</p>
            <p>{sucursal.horario}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sucursales;

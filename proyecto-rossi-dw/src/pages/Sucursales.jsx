// src/pages/Sucursales.jsx
import React, { useState, useEffect } from 'react';
import '@styles/main.scss'; 

const Sucursales = () => {
  // Estado para guardar las sucursales cargadas
  // REQUISITO CUMPLIDO: Uso de useState
  const [sucursalesData, setSucursalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función asíncrona para cargar datos
  // REQUISITO CUMPLIDO: Uso de fetch y funciones async/await
  const fetchSucursales = async () => {
    try {
      setLoading(true);
      // Usamos fetch con la ruta absoluta del archivo db.json en la carpeta public
      const response = await fetch('/db.json'); 
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Solo tomamos la clave 'sucursales' del JSON
      setSucursalesData(data.sucursales); 
      setError(null);

    } catch (err) {
      console.error("Fallo al obtener sucursales:", err);
      setError("No se pudieron cargar los datos de las sucursales.");
    } finally {
      setLoading(false);
    }
  };

  // Hook useEffect para ejecutar la carga de datos al montar el componente
  // REQUISITO CUMPLIDO: Uso de useEffect
  useEffect(() => {
    fetchSucursales();
  }, []); // Se ejecuta solo una vez al montar

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
            {/* Usamos la ruta proporcionada por el mock */}
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
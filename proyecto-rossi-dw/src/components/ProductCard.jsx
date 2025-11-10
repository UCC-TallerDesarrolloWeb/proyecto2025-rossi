// src/components/ProductCard.jsx (CÓDIGO FINAL CORREGIDO)

import React, { useState, useEffect } from 'react';
// La advertencia sobre 'agregarCarrito' debería desaparecer con la corrección a continuación
import { calcularPrecioFinal, agregarCarrito} from '@utils/funciones'; 
import '@styles/main.scss';

const ProductCard = ({ producto, index }) => {
  const [medallones, setMedallones] = useState(1);
  const [conPapas, setConPapas] = useState(false);
  const [conBebida, setConBebida] = useState(false);
  const [precioActual, setPrecioActual] = useState(producto.precio);

  useEffect(() => {
    const nuevoPrecio = calcularPrecioFinal(producto.precio, medallones, conPapas, conBebida);
    setPrecioActual(nuevoPrecio);
  }, [medallones, conPapas, conBebida, producto.precio]);

  const imageUrl = producto.imagen; // La referencia a la imagen importada

  return (
    <div className="card">
      <img src={imageUrl} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p><strong>Precio: ${precioActual}</strong></p>
      
      <form className="oscuro" onSubmit={(e) => e.preventDefault()}>
        <label>Medallones:
          <select 
            value={medallones} 
            onChange={(e) => setMedallones(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        
        <label>
          <input 
            type="checkbox" 
            checked={conPapas} 
            onChange={(e) => setConPapas(e.target.checked)}
          /> Con papas
        </label>
        
        <label>
          <input 
            type="checkbox" 
            checked={conBebida} 
            onChange={(e) => setConBebida(e.target.checked)}
          /> Con bebida
        </label>
        
        {/* Llama a la función directamente en el evento onClick */}
        <button 
          type="button" 
          onClick={() => agregarCarrito(index, medallones, conPapas, conBebida, precioActual)}
        >
          Agregar al carrito
        </button>
      </form>
    </div>
  );
};

export default ProductCard;
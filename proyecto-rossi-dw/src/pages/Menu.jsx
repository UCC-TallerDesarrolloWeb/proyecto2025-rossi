
import React from 'react';
import { productos  } from '@utils/funciones'; 
import '@styles/main.scss'; 
import ProductCard from '@components/ProductCard';

const Menu = () => {
  
  return (
    <section className="section">
      <h2>Nuestras Hamburguesas</h2>
      <div className="grid">
        {productos.map((producto, index) => (
          <ProductCard 
            key={index} 
            producto={producto} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
};

export default Menu;
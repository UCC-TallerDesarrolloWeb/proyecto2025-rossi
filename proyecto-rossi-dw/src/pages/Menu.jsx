import { productos } from "@utils/funciones";
import ProductCard from "@components/ProductCard";
import "@styles/main.scss";

const Menu = () => {
  return (
    <section className="section">
      <h2>Nuestras Hamburguesas</h2>
      <div className="grid">
        {productos.map((producto, index) => (
          <ProductCard
            key={producto.nombre}
            producto={producto}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Menu;

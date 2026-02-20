import { useState, useEffect, useCallback } from "react";
import "@styles/main.scss";
import {
  productos,
  calcularPrecioFinal,
  getCarritoFromStorage,
  eliminarProducto,
  vaciarCarrito,
} from "@utils/funciones";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [totalGeneral, setTotalGeneral] = useState(0);

  const cargarCarrito = useCallback(() => {
    const items = getCarritoFromStorage();
    setCarrito(items);

    let total = 0;
    items.forEach((item) => {
      const p = productos[item.id];
      if (p) {
        const precioFinal = calcularPrecioFinal(
          p.precio,
          item.med,
          item.papas,
          item.bebida
        );
        total += precioFinal;
      }
    });
    setTotalGeneral(total);
  }, []);

  useEffect(() => {
    cargarCarrito();
  }, [cargarCarrito]);

  const handleEliminarProducto = (idx) => {
    eliminarProducto(idx, cargarCarrito);
  };

  const handleVaciarCarrito = () => {
    vaciarCarrito(cargarCarrito);
  };

  return (
    <section className="section">
      <h2>Tu Carrito</h2>
      {carrito.length === 0 ? (
        <h3>Tu carrito está vacío 🍔</h3>
      ) : (
        <>
          <div id="mostrar-carrito" className="grid">
            {carrito.map((item, idx) => {
              const p = productos[item.id];
              if (!p) return null;

              const precioFinal = calcularPrecioFinal(
                p.precio,
                item.med,
                item.papas,
                item.bebida
              );

              return (
                <div key={`${item.id}-${idx}`} className="card">
                  <img src={p.imagen} alt={p.nombre} />
                  <h3>{p.nombre}</h3>
                  <p>
                    Medallones: {item.med} {item.papas ? "· Con papas" : ""}{" "}
                    {item.bebida ? "· Con bebida" : ""}
                  </p>
                  <p>
                    <strong>${precioFinal}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => handleEliminarProducto(idx)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>

          <div id="total-carrito" className="carrito-footer">
            <strong>Total de la compra: ${totalGeneral}</strong>
            <button
              type="button"
              onClick={handleVaciarCarrito}
              className="btn-vaciar"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Carrito;

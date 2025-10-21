
const productos = [
  { nombre: "Bacon Cheese", descripcion: "Queso cheddar, bacon y salsa especial.", precio: 2500, imagen: "imagenes/bacon-cheese-burg.jpg" },
  { nombre: "Clásica", descripcion: "Lechuga, tomate, cebolla y mayonesa casera.", precio: 2200, imagen: "imagenes/clasica-burg.jpg" },
  { nombre: "Veggie", descripcion: "Medallón vegano, queso brie y guacamole casero.", precio: 2300, imagen: "imagenes/veggie-burg.jpg" },
  { nombre: "Ruta 66", descripcion: "Salsa especial, queso emmental y cebolla caramelizada.", precio: 2700, imagen: "imagenes/route-66-burb.jpg" },
  { nombre: "Mexicana", descripcion: "Jalapeños, guacamole, barbacoa y nachos.", precio: 2600, imagen: "imagenes/mexicana-burg.jpg" },
  { nombre: "Pollo Crispy", descripcion: "Pollo crispy, alioli, tomate, lechuga y huevo frito.", precio: 2800, imagen: "imagenes/pollo-burg.jpg" }
];

/**
 * Calcula el precio final de una hamburguesa según las opciones elegidas.
 * @method calcularPrecioFinal
 * @param {number} base - Precio base de la hamburguesa.
 * @param {number} [med=1] - Cantidad de medallones seleccionados.
 * @param {boolean} [papas=false] - Indica si se agregan papas (+$300).
 * @param {boolean} [bebida=false] - Indica si se agrega bebida (+$400).
 * @returns {number} Precio final calculado con los adicionales.
 */
function calcularPrecioFinal(base, med = 1, papas = false, bebida = false) {
  let total = base + (med - 1) * 200; // +$200 por medallón extra
  if (papas) total += 300;
  if (bebida) total += 400;
  return total;
}

/**
 * Agrega un producto al carrito con sus opciones seleccionadas (medallones, papas, bebida).
 * Guarda los datos en localStorage.
 * @method agregarCarrito
 * @param {number} id - Índice del producto dentro del array `productos`.
 */
function agregarCarrito(id) {
  const med = parseInt(document.getElementById(`med-${id}`)?.value || 1, 10);
  const papas = !!document.getElementById(`papas-${id}`)?.checked;
  const bebida = !!document.getElementById(`bebida-${id}`)?.checked;
  const base = productos[id].precio;
  const precio = calcularPrecioFinal(base, med, papas, bebida);

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.map(item => {
    if (typeof item === "number" || typeof item === "string") {
      const pid = parseInt(item, 10);
      return { id: pid, med: 1, papas: false, bebida: false, precio: productos[pid].precio };
    }
    return item;
  });

  carrito.push({ id, med, papas, bebida, precio });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${productos[id].nombre} agregada al carrito 🛍️`);
}

/**
 * Carga los productos guardados en el carrito desde localStorage y los muestra en pantalla.
 * También calcula el total general de la compra.
 * @method cargarCarrito
 */
function cargarCarrito() {
  console.log("Cargando carrito...");
  const contenedor = document.getElementById("mostrar-carrito");
  const totalBox  = document.getElementById("total-carrito"); 
  if (!contenedor) return console.error("No se encontró #mostrar-carrito");

  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (!carrito || carrito.length === 0) {
    contenedor.innerHTML = "<h3>Tu carrito está vacío 🍔</h3>";
    if (totalBox) totalBox.textContent = "";
    return;
  }

  carrito = carrito.map(item => {
    if (typeof item === "number" || typeof item === "string") {
      const pid = parseInt(item, 10);
      return { id: pid, med: 1, papas: false, bebida: false, precio: productos[pid].precio };
    }
    return item;
  });

  let html = "";
  let totalGeneral = 0;

  carrito.forEach((item, idx) => {
    const p = productos[item.id];
    const precioFinal = calcularPrecioFinal(p.precio, item.med, item.papas, item.bebida);
    totalGeneral += precioFinal;

    html += `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>Medallones: ${item.med} ${item.papas ? "· Con papas" : ""} ${item.bebida ? "· Con bebida" : ""}</p>
        <p><strong>$${precioFinal}</strong></p>
        <button type="button" onClick="eliminarProducto(${idx})">Eliminar</button>
      </div>
    `;
  });

  contenedor.innerHTML = html;
  if (totalBox) totalBox.innerHTML = `<strong>Total de la compra: $${totalGeneral}</strong>`;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/**
 * Elimina un producto específico del carrito según su índice.
 * Si no quedan productos, elimina la clave completa del localStorage.
 * @method eliminarProducto
 * @param {number} id - Índice del producto dentro del array del carrito.
 */
function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(id, 1);
  if (carrito.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    localStorage.removeItem("carrito");
  }
  cargarCarrito();
}

/**
 * Vacía completamente el carrito y actualiza la vista.
 * @method vaciarCarrito
 */
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  cargarCarrito();
}

document.addEventListener("DOMContentLoaded", cargarCarrito);

/**
 * Actualiza el precio mostrado en el menú en tiempo real
 * según los medallones, papas o bebida seleccionados.
 * @method actualizarPrecio
 * @param {number} id - Índice del producto dentro del array `productos`.
 */
function actualizarPrecio(id) {
  const base = productos[id].precio;

  const medallones = parseInt(document.getElementById(`med-${id}`).value);
  const conPapas = document.getElementById(`papas-${id}`).checked;
  const conBebida = document.getElementById(`bebida-${id}`).checked;

  let total = base + (medallones - 1) * 200;
  if (conPapas) total += 300;
  if (conBebida) total += 400;

  const precioTag = document.getElementById(`precio-${id}`);
  precioTag.innerHTML = `<strong>Precio: $${total}</strong>`;
}


const productos = [
  { nombre: "Bacon Cheese", descripcion: "Queso cheddar, bacon y salsa especial.", precio: 2500, imagen: "imagenes/bacon-cheese-burg.jpg" },
  { nombre: "Clásica", descripcion: "Lechuga, tomate, cebolla y mayonesa casera.", precio: 2200, imagen: "imagenes/clasica-burg.jpg" },
  { nombre: "Veggie", descripcion: "Medallón vegano, queso brie y guacamole casero.", precio: 2300, imagen: "imagenes/veggie-burg.jpg" },
  { nombre: "Ruta 66", descripcion: "Salsa especial, queso emmental y cebolla caramelizada.", precio: 2700, imagen: "imagenes/route-66-burb.jpg" },
  { nombre: "Mexicana", descripcion: "Jalapeños, guacamole, barbacoa y nachos.", precio: 2600, imagen: "imagenes/mexicana-burg.jpg" },
  { nombre: "Pollo Crispy", descripcion: "Pollo crispy, alioli, tomate, lechuga y huevo frito.", precio: 2800, imagen: "imagenes/pollo-burg.jpg" }
];


function agregarCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${productos[id].nombre} agregada al carrito 🛍️`);
}


function cargarCarrito() {
  console.log("Cargando carrito...");
  const contenedor = document.getElementById("mostrar-carrito");
  if (!contenedor) return console.error("No se encontró #mostrar-carrito");

  const carrito = JSON.parse(localStorage.getItem("carrito"));
  if (!carrito || carrito.length === 0) {
    contenedor.innerHTML = "<h3>Tu carrito está vacío 🍔</h3>";
    return;
  }

  let contenido = "";
  carrito.forEach((num, id) => {
    const producto = productos[parseInt(num)];
    if (!producto) return;
    contenido += `
      <div class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>$${producto.precio}</strong></p>
        <button type="button" onClick="eliminarProducto(${id})">Eliminar</button>
      </div>`;
  });

  contenido += `
    <div style="margin-top:2rem; text-align:center;">
      <button type="button" onClick="vaciarCarrito()">Vaciar Carrito</button>
    </div>`;

  contenedor.innerHTML = contenido;
}


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

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  cargarCarrito();
}


document.addEventListener("DOMContentLoaded", cargarCarrito);

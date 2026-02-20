import baconCheeseImg from "@assets/bacon-cheese-burg.jpg";
import clasicaImg from "@assets/clasica-burg.jpg";
import veggieImg from "@assets/veggie-burg.jpg";
import route66Img from "@assets/route-66-burb.jpg";
import mexicanaImg from "@assets/mexicana-burg.jpg";
import polloImg from "@assets/pollo-burg.jpg";

export const productos = [
  {
    nombre: "Bacon Cheese",
    descripcion: "Queso cheddar, bacon y salsa especial.",
    precio: 2500,
    imagen: baconCheeseImg,
  },
  {
    nombre: "Clásica",
    descripcion: "Lechuga, tomate, cebolla y mayonesa casera.",
    precio: 2200,
    imagen: clasicaImg,
  },
  {
    nombre: "Veggie",
    descripcion: "Medallón vegano, queso brie y guacamole casero.",
    precio: 2300,
    imagen: veggieImg,
  },
  {
    nombre: "Ruta 66",
    descripcion: "Salsa especial, queso emmental y cebolla caramelizada.",
    precio: 2700,
    imagen: route66Img,
  },
  {
    nombre: "Mexicana",
    descripcion: "Jalapeños, guacamole, barbacoa y nachos.",
    precio: 2600,
    imagen: mexicanaImg,
  },
  {
    nombre: "Pollo Crispy",
    descripcion: "Pollo crispy, alioli, tomate, lechuga y huevo frito.",
    precio: 2800,
    imagen: polloImg,
  },
];

export function calcularPrecioFinal(
  base,
  med = 1,
  papas = false,
  bebida = false
) {
  let total = base + (med - 1) * 200;
  if (papas) total += 300;
  if (bebida) total += 400;
  return total;
}

export const getCarritoFromStorage = () => {
  const data = localStorage.getItem("carrito");
  return data ? JSON.parse(data) : [];
};

export const saveCarritoToStorage = (carrito) => {
  if (carrito.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    localStorage.removeItem("carrito");
  }
};

export function agregarCarrito(id, med, papas, bebida, precio) {
  let carrito = getCarritoFromStorage();

  if (!productos[id]) return;

  carrito.push({ id, med, papas, bebida, precio });
  saveCarritoToStorage(carrito);
  alert(`${productos[id].nombre} agregada al carrito 🛍️`);
}

export function eliminarProducto(id, callback) {
  let carrito = getCarritoFromStorage();
  carrito.splice(id, 1);
  saveCarritoToStorage(carrito);
  if (callback) callback();
}

export function vaciarCarrito(callback) {
  localStorage.removeItem("carrito");
  if (callback) callback();
}

export const validateField = (name, value) => {
  let error = "";
  if (name === "email") {
    if (value.length > 0 && !value.includes("@")) {
      error = "El correo electrónico debe ser válido (incluir @)";
    } else if (value.length === 0) {
      error = "El correo electrónico es obligatorio";
    }
  }
  return error;
};

export const validateForm = (data) => {
  let newErrors = {};
  let isValid = true;

  if (!data.email || data.email.trim() === "") {
    newErrors.email = "El correo electrónico es obligatorio";
    isValid = false;
  } else if (data.email && !data.email.includes("@")) {
    newErrors.email = "El correo electrónico debe ser válido";
    isValid = false;
  }

  return { errors: newErrors, isValid };
};

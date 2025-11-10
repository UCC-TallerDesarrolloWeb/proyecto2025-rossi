// src/utils/funciones.js

// Importación de imágenes desde la carpeta @assets (asumiendo que tus imágenes están ahí)
import baconCheeseImg from '@assets/bacon-cheese-burg.jpg'; 
import clasicaImg from '@assets/clasica-burg.jpg';
import veggieImg from '@assets/veggie-burg.jpg';
import route66Img from '@assets/route-66-burb.jpg';
import mexicanaImg from '@assets/mexicana-burg.jpg';
import polloImg from '@assets/pollo-burg.jpg';

// --- DATOS PRINCIPALES ---

export const productos = [
  // Usamos la referencia importada (variable) en lugar de la cadena de texto
  { nombre: "Bacon Cheese", descripcion: "Queso cheddar, bacon y salsa especial.", precio: 2500, imagen: baconCheeseImg },
  { nombre: "Clásica", descripcion: "Lechuga, tomate, cebolla y mayonesa casera.", precio: 2200, imagen: clasicaImg },
  { nombre: "Veggie", descripcion: "Medallón vegano, queso brie y guacamole casero.", precio: 2300, imagen: veggieImg },
  { nombre: "Ruta 66", descripcion: "Salsa especial, queso emmental y cebolla caramelizada.", precio: 2700, imagen: route66Img },
  { nombre: "Mexicana", descripcion: "Jalapeños, guacamole, barbacoa y nachos.", precio: 2600, imagen: mexicanaImg },
  { nombre: "Pollo Crispy", descripcion: "Pollo crispy, alioli, tomate, lechuga y huevo frito.", precio: 2800, imagen: polloImg }
];

// --- FUNCIONES DE CÁLCULO ---

/**
 * Calcula el precio final de una hamburguesa según las opciones elegidas.
 */
export function calcularPrecioFinal(base, med = 1, papas = false, bebida = false) {
  let total = base + (med - 1) * 200; // +$200 por medallón extra
  if (papas) total += 300;
  if (bebida) total += 400;
  return total;
}

// --- FUNCIONES DE MANEJO DE LOCALSTORAGE (CARRITO) ---

/**
 * Obtiene el carrito de localStorage, manejando estructuras antiguas si existen.
 */
export const getCarritoFromStorage = () => {
    const data = localStorage.getItem("carrito");
    let carrito = data ? JSON.parse(data) : [];
    
    // Mapeo para asegurar que los ítems viejos se vean como objetos
    return carrito.map(item => {
        if (typeof item === "number" || typeof item === "string") {
            const pid = parseInt(item, 10);
            return { id: pid, med: 1, papas: false, bebida: false, precio: productos[pid].precio };
        }
        return item;
    });
};

/**
 * Guarda el carrito en localStorage o lo elimina si está vacío.
 */
export const saveCarritoToStorage = (carrito) => {
    if (carrito.length > 0) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        localStorage.removeItem("carrito");
    }
};

/**
 * Agrega un producto al carrito y lo guarda en localStorage.
 */
export function agregarCarrito(id, med, papas, bebida, precio) {
    let carrito = getCarritoFromStorage();

    if (!productos[id]) {
        console.error("ID de producto no válido:", id);
        return; 
    }

    // Agrega el nuevo ítem
    carrito.push({ id, med, papas, bebida, precio });

    saveCarritoToStorage(carrito);
    alert(`${productos[id].nombre} agregada al carrito 🛍️`);
}

/**
 * Elimina un producto del carrito y actualiza el almacenamiento.
 * Requiere un callback para que el componente React actualice su estado.
 */
export function eliminarProducto(id, callback) {
  let carrito = getCarritoFromStorage();
  carrito.splice(id, 1); // Elimina el elemento por índice
  saveCarritoToStorage(carrito);
  
  if (callback) callback(); // Notifica al componente Carrito para recargar
}

/**
 * Vacía completamente el carrito.
 * Requiere un callback para que el componente React actualice su estado.
 */
export function vaciarCarrito(callback) {
  localStorage.removeItem("carrito");
  if (callback) callback(); // Notifica al componente Carrito para recargar
}
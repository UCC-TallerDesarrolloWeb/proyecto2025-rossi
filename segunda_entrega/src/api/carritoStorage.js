const CLAVE_CARRITO = 'burgerHouseCarrito';

export const obtenerCarrito = () => {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (!carritoGuardado) {
        return [];
    }

    try {
        const carrito = JSON.parse(carritoGuardado);
        return Array.isArray(carrito) ? carrito : [];
    } catch {
        return [];
    }
};

export const guardarCarrito = (carrito) => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};

export const agregarProducto = (producto) => {
    const carrito = obtenerCarrito();
    const carritoActualizado = [...carrito, producto];
    guardarCarrito(carritoActualizado);
    return carritoActualizado;
};

export const eliminarProducto = (idCarrito) => {
    const carritoActualizado = obtenerCarrito().filter(
        (producto) => producto.idCarrito !== idCarrito
    );
    guardarCarrito(carritoActualizado);
    return carritoActualizado;
};

export const vaciarCarrito = () => {
    localStorage.removeItem(CLAVE_CARRITO);
};

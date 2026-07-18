const obtenerDatos = async () => {
    const respuesta = await fetch('/db.json');

    if (!respuesta.ok) {
        throw new Error('No se pudieron cargar los datos.');
    }

    return respuesta.json();
};

export const obtenerHamburguesas = async () => {
    const datos = await obtenerDatos();
    return datos.hamburguesas;
};

export const obtenerSucursales = async () => {
    const datos = await obtenerDatos();
    return datos.sucursales;
};

const CLAVE_CARRITO = 'carritoBurgerHouse';

/**
 * Obtiene los productos guardados en el carrito.
 * @returns {Array<Object>} Productos almacenados.
 */
const obtenerCarrito = () => {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
  if (!carritoGuardado) return [];
  try { return JSON.parse(carritoGuardado); } catch { return []; }
};

/**
 * Guarda el carrito en el almacenamiento local.
 * @param {Array<Object>} carrito - Productos a guardar.
 * @returns {void}
 */
const guardarCarrito = (carrito) => localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));

/**
 * Calcula el precio final de una hamburguesa.
 * @param {number} precioBase - Precio de la hamburguesa con un medallón.
 * @param {number} medallones - Cantidad de medallones seleccionada.
 * @param {boolean} papas - Indica si incluye papas.
 * @param {boolean} bebida - Indica si incluye bebida.
 * @returns {number} Precio final.
 */
const calcularPrecio = (precioBase, medallones, papas, bebida) => precioBase + ((medallones - 1) * 200) + (papas ? 100 : 0) + (bebida ? 100 : 0);

/**
 * Agrega una hamburguesa seleccionada al carrito.
 * @param {string} nombre - Nombre de la hamburguesa.
 * @param {number} precioBase - Precio base del producto.
 * @param {string} imagen - Ruta de la imagen.
 * @param {string} idMedallones - Identificador del selector de medallones.
 * @param {string} idPapas - Identificador de la opción de papas.
 * @param {string} idBebida - Identificador de la opción de bebida.
 * @returns {void}
 */
const agregarAlCarrito = (nombre, precioBase, imagen, idMedallones, idPapas, idBebida) => {
  const medallones = Number(document.getElementById(idMedallones).value);
  const papas = document.getElementById(idPapas).checked;
  const bebida = document.getElementById(idBebida).checked;
  const producto = { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, nombre, imagen, medallones, papas, bebida, precioFinal: calcularPrecio(precioBase, medallones, papas, bebida) };
  const carrito = obtenerCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
  alert(`${nombre} fue agregada al carrito.`);
};

/**
 * Muestra los productos y el total del carrito.
 * @returns {void}
 */
const mostrarCarrito = () => {
  const contenedor = document.getElementById('lista-carrito');
  if (!contenedor) return;
  const carrito = obtenerCarrito();
  const totalElemento = document.getElementById('total-carrito');
  const botonVaciar = document.getElementById('vaciar-carrito');
  contenedor.innerHTML = '';
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="mensaje-vacio">El carrito está vacío.</p>';
    totalElemento.textContent = 'Total de la compra: $0';
    botonVaciar.hidden = true;
    return;
  }
  carrito.forEach((producto) => {
    const articulo = document.createElement('article');
    articulo.className = 'tarjeta producto-carrito';
    const adicionales = `${producto.papas ? '<p>Con papas</p>' : ''}${producto.bebida ? '<p>Con bebida</p>' : ''}`;
    articulo.innerHTML = `<img src="${producto.imagen}" alt="Hamburguesa ${producto.nombre}"><div><h3>${producto.nombre}</h3><p>Medallones: ${producto.medallones}</p>${adicionales}<p class="precio">$${producto.precioFinal}</p></div><button class="boton boton-peligro" type="button" onclick="eliminarProducto('${producto.id}')">Eliminar</button>`;
    contenedor.appendChild(articulo);
  });
  const total = carrito.reduce((suma, producto) => suma + producto.precioFinal, 0);
  totalElemento.textContent = `Total de la compra: $${total}`;
  botonVaciar.hidden = false;
};

/**
 * Elimina un producto por su identificador.
 * @param {string} id - Identificador único.
 * @returns {void}
 */
const eliminarProducto = (id) => { guardarCarrito(obtenerCarrito().filter((producto) => producto.id !== id)); mostrarCarrito(); };

/**
 * Vacía el carrito después de solicitar confirmación.
 * @returns {void}
 */
const vaciarCarrito = () => { if (confirm('¿Querés vaciar el carrito?')) { localStorage.removeItem(CLAVE_CARRITO); mostrarCarrito(); } };

/**
 * Limpia un campo inválido, informa el error y coloca el foco.
 * @param {HTMLInputElement|HTMLTextAreaElement} campo - Campo incorrecto.
 * @param {string} mensaje - Mensaje que se mostrará al usuario.
 * @returns {void}
 */
const invalidarCampo = (campo, mensaje) => { alert(mensaje); campo.value = ''; campo.focus(); };

/**
 * Valida el formulario de contacto.
 * @param {SubmitEvent} evento - Evento de envío.
 * @returns {void}
 */
const validarFormulario = (evento) => {
  evento.preventDefault();
  const formulario = evento.currentTarget;
  const campos = { nombre: formulario.nombre, apellido: formulario.apellido, telefono: formulario.telefono, correo: formulario.correo, mensaje: formulario.mensaje };
  if (!campos.nombre.value.trim()) { invalidarCampo(campos.nombre, 'Ingresá tu nombre.'); return; }
  if (!campos.apellido.value.trim()) { invalidarCampo(campos.apellido, 'Ingresá tu apellido.'); return; }
  if (campos.telefono.value.trim() && !/^[0-9\s()-]+$/.test(campos.telefono.value)) { invalidarCampo(campos.telefono, 'El teléfono solo puede contener números, espacios, guiones o paréntesis.'); return; }
  if (!campos.correo.validity.valid) { invalidarCampo(campos.correo, 'Ingresá un correo electrónico válido.'); return; }
  if (!campos.mensaje.value.trim()) { invalidarCampo(campos.mensaje, 'Ingresá un mensaje.'); return; }
  alert('Mensaje enviado correctamente.');
  formulario.reset();
};

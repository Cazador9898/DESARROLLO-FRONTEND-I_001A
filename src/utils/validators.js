/** Validaciones independientes de React, reutilizables y comprobables con tests. */
export function validarContacto({ nombre = "", email = "", mensaje = "" }) {
  const errores = {};
  if (nombre.trim().length < 2) errores.nombre = "Ingresa un nombre de al menos 2 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errores.email = "Ingresa un correo electrónico válido.";
  }
  if (mensaje.trim().length < 10) errores.mensaje = "Escribe un mensaje de al menos 10 caracteres.";
  return errores;
}

export function validarVideojuego({ nombre = "", categoria = "", descripcion = "", precio = "", oferta = "", imagen = "" }) {
  const errores = {};
  if (nombre.trim().length < 2) errores.nombre = "El nombre debe tener al menos 2 caracteres.";
  if (categoria.trim().length < 2) errores.categoria = "Escribe una categoría válida.";
  if (descripcion.trim().length < 10) errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  const normal = Number(precio);
  const promocion = oferta === "" ? normal : Number(oferta);
  if (precio === "" || !Number.isSafeInteger(normal) || normal <= 0) {
    errores.precio = "Indica un precio entero mayor que cero.";
  }
  if (oferta !== "" && (!Number.isSafeInteger(promocion) || promocion <= 0 || promocion > normal)) {
    errores.oferta = "La oferta debe ser positiva y no superar el precio normal.";
  }
  if (!imagen || !["assets/img/terraria.svg", "assets/img/stardew.svg", "assets/img/halo.svg", "assets/img/cities.svg"].includes(imagen)) {
    errores.imagen = "Selecciona una de las imágenes disponibles.";
  }
  return errores;
}

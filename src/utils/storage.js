export const CLAVE_CATALOGO = "the_storex_eft_catalogo";
export const CLAVE_CARRITO = "the_storex_eft_carrito";

export function leerAlmacenamiento(clave, respaldo) {
  try {
    const valor = window.localStorage.getItem(clave);
    if (!valor) return respaldo;
    const datos = JSON.parse(valor);
    return Array.isArray(datos) ? datos : respaldo;
  } catch {
    // El navegador puede bloquear localStorage o contener datos antiguos inválidos.
    return respaldo;
  }
}

export function guardarAlmacenamiento(clave, datos) {
  try {
    window.localStorage.setItem(clave, JSON.stringify(datos));
  } catch {
    // La aplicación seguirá funcionando durante la sesión aunque el almacenamiento falle.
  }
}

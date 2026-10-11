/** Funciones puras para filtrar y presentar el catálogo. */
export function obtenerCategorias(productos) {
  return ["Todos", ...new Set(productos.map((producto) => producto.categoria))];
}

export function filtrarProductos(productos, busqueda, categoria) {
  const texto = busqueda.trim().toLocaleLowerCase("es");

  return productos.filter((producto) => {
    const nombre = producto.nombre.toLocaleLowerCase("es");
    const coincideNombre = nombre.includes(texto);
    const coincideCategoria = categoria === "Todos" || producto.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });
}

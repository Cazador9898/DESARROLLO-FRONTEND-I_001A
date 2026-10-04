import ProductCard from "./ProductCard";

export default function ProductList({
  productos,
  onAgregar,
  estaEnCarrito,
  mostrarDescripciones,
}) {
  // Renderizado condicional cuando el filtro o búsqueda no encuentra productos.
  if (productos.length === 0) {
    return <div className="alert alert-info">No se encontraron productos.</div>;
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAgregar={onAgregar}
          enCarrito={estaEnCarrito(producto.id)}
          mostrarDescripcion={mostrarDescripciones}
        />
      ))}
    </div>
  );
}

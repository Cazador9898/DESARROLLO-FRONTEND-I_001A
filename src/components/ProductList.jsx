import ProductCard from "./ProductCard.jsx";

export default function ProductList({ productos, onAgregar, estaEnCarrito, mostrarDescripciones }) {
  if (productos.length === 0) {
    return <div className="alert alert-info" role="status">No se encontraron videojuegos. Prueba otra búsqueda o restaura el catálogo.</div>;
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

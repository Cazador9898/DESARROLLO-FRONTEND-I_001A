import { formatearPrecio } from "../utils/formatters";

export default function Cart({ carrito, onEliminar, onVaciar }) {
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const total = carrito.reduce((suma, item) => suma + item.oferta * item.cantidad, 0);

  return (
    <section id="carrito" className="seccion-carrito py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <p className="etiqueta">Resumen dinámico</p>
            <h2 className="fw-bold">Carrito de compras</h2>

            {carrito.length === 0 ? (
              <div className="alert alert-light border" role="status">
                Tu carrito está vacío. Agrega un videojuego desde el catálogo.
              </div>
            ) : (
              carrito.map((item) => (
                <div className="item-carrito" key={item.id}>
                  <span>
                    <strong>{item.nombre}</strong> x {item.cantidad}
                  </span>
                  <span>
                    {formatearPrecio(item.oferta * item.cantidad)}
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      type="button"
                      onClick={() => onEliminar(item.id)}
                      aria-label={`Eliminar una unidad de ${item.nombre}`}
                    >
                      Eliminar
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="h5">Resumen</h3>
                <p>
                  Productos: <strong>{cantidad}</strong>
                </p>
                <p>
                  Total: <strong>{formatearPrecio(total)}</strong>
                </p>
                <button
                  className="btn btn-outline-danger w-100"
                  type="button"
                  onClick={onVaciar}
                  disabled={carrito.length === 0}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { formatearPrecio } from "../utils/formatters.js";

export default function Cart({ carrito, onEliminar, onVaciar }) {
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const total = carrito.reduce((suma, item) => suma + item.oferta * item.cantidad, 0);

  return (
    <section id="carrito" className="seccion-carrito py-5" aria-labelledby="tituloCarrito">
      <div className="container py-2">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <p className="etiqueta">Tu selección</p>
            <h2 id="tituloCarrito" className="fw-bold mb-3">Carrito de compras</h2>
            {carrito.length === 0 ? (
              <div className="alert alert-light border" role="status">Tu carrito está vacío. Elige algún videojuego del catálogo.</div>
            ) : (
              <div aria-live="polite">
                {carrito.map((item) => (
                  <div className="item-carrito" key={item.id}>
                    <span><strong>{item.nombre}</strong> <span className="text-muted">× {item.cantidad}</span></span>
                    <span>
                      <strong>{formatearPrecio(item.oferta * item.cantidad)}</strong>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        type="button"
                        onClick={() => onEliminar(item.id)}
                        aria-label={`Quitar una unidad de ${item.nombre} del carrito`}
                      >
                        Quitar una
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-12 col-lg-4">
            <div className="card tarjeta-panel">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-3">Resumen de compra</h3>
                <p className="d-flex justify-content-between">Unidades <strong>{cantidad}</strong></p>
                <p className="d-flex justify-content-between fs-5">Total <strong>{formatearPrecio(total)}</strong></p>
                <button className="btn btn-outline-danger w-100" type="button" onClick={onVaciar} disabled={carrito.length === 0}>Vaciar carrito</button>
                <p className="small text-muted mt-3 mb-0">Carrito demostrativo: no se procesan pagos ni compras reales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

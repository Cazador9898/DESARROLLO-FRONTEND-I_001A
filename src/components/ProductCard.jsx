import { formatearPrecio } from "../utils/formatters.js";

export default function ProductCard({ producto, onAgregar, enCarrito, mostrarDescripcion }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <article className={`card card-producto h-100 shadow-sm ${enCarrito ? "producto-seleccionado" : ""}`}>
        <img
          src={`${import.meta.env.BASE_URL}${producto.imagen}`}
          className="card-img-top"
          alt={`Ilustración de ${producto.nombre}`}
          loading="lazy"
        />
        <div className="card-body d-flex flex-column">
          <span className="badge text-bg-secondary align-self-start mb-2">{producto.categoria}</span>
          <h3 className="card-title h5">{producto.nombre}</h3>
          {mostrarDescripcion && <p className="card-text">{producto.descripcion}</p>}
          <p className="precio-normal mb-0">Precio normal: <del>{formatearPrecio(producto.precio)}</del></p>
          <p className="precio-oferta mt-1 mb-3">Oferta: {formatearPrecio(producto.oferta)}</p>
          <button
            type="button"
            className={`btn fw-bold mt-auto ${enCarrito ? "btn-success" : "btn-acento"}`}
            onClick={() => onAgregar(producto)}
          >
            {enCarrito ? "En carrito · sumar otro" : "Agregar al carrito"}
          </button>
        </div>
      </article>
    </div>
  );
}

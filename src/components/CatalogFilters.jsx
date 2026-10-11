export default function CatalogFilters({ busqueda, onBusqueda, categoria, onCategoria, categorias, cantidad }) {
  return (
    <div className="filtros-catalogo rounded-4 p-3 p-md-4 mb-4">
      <div className="row align-items-end g-3">
        <div className="col-12 col-lg-6">
          <label htmlFor="textoBusqueda" className="form-label fw-semibold">Buscar videojuegos</label>
          <input
            type="search"
            className="form-control form-control-lg"
            id="textoBusqueda"
            value={busqueda}
            onChange={(evento) => onBusqueda(evento.target.value)}
            placeholder="Ej.: Terraria"
          />
        </div>
        <div className="col-12 col-lg-6">
          <span className="form-label fw-semibold d-block">Filtrar por categoría</span>
          <div className="d-flex flex-wrap gap-2" role="group" aria-label="Categorías">
            {categorias.map((opcion) => (
              <button
                key={opcion}
                type="button"
                className={`btn btn-sm ${categoria === opcion ? "btn-acento" : "btn-outline-secondary"}`}
                aria-pressed={categoria === opcion}
                onClick={() => onCategoria(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted small mb-0 mt-3" aria-live="polite">
        {cantidad} videojuego{cantidad === 1 ? "" : "s"} en los resultados.
      </p>
    </div>
  );
}

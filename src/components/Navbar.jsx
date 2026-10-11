import { useState } from "react";

export default function Navbar({ cantidadCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-storex sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio" onClick={cerrarMenu}>
          <span className="marca-icono" aria-hidden="true">✦</span> The Storex
        </a>
        <button
          type="button"
          className="navbar-toggler"
          aria-controls="menuPrincipal"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`} id="menuPrincipal">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-1 py-2 py-lg-0">
            <a className="nav-link" href="#inicio" onClick={cerrarMenu}>Inicio</a>
            <a className="nav-link" href="#productos" onClick={cerrarMenu}>Catálogo</a>
            <a className="nav-link" href="#administrar" onClick={cerrarMenu}>Administrar</a>
            <a className="nav-link" href="#contacto" onClick={cerrarMenu}>Contacto</a>
            <a className="btn btn-acento ms-lg-2 mt-2 mt-lg-0" href="#carrito" onClick={cerrarMenu}>
              Carrito <span className="badge text-bg-dark ms-1">{cantidadCarrito}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

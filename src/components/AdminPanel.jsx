import { useState } from "react";
import { formatearPrecio } from "../utils/formatters.js";
import { validarVideojuego } from "../utils/validators.js";

const imagenes = [
  { ruta: "assets/img/terraria.svg", etiqueta: "Aventura (ilustración Terraria)" },
  { ruta: "assets/img/stardew.svg", etiqueta: "Simulación (ilustración Stardew Valley)" },
  { ruta: "assets/img/halo.svg", etiqueta: "Acción (ilustración Halo)" },
  { ruta: "assets/img/cities.svg", etiqueta: "Estrategia (ilustración Cities)" },
];

const valoresIniciales = {
  nombre: "",
  categoria: "",
  precio: "",
  oferta: "",
  descripcion: "",
  imagen: imagenes[0].ruta,
};

export default function AdminPanel({ productos, onAgregar, onEliminar, onRestaurar }) {
  const [formulario, setFormulario] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState("");

  function cambiar(evento) {
    const { name, value } = evento.target;
    setFormulario((datos) => ({ ...datos, [name]: value }));
    setErrores((actual) => ({ ...actual, [name]: undefined }));
    setAviso("");
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarVideojuego(formulario);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      setAviso("Revisa los campos marcados para agregar el videojuego.");
      return;
    }

    const nuevo = {
      id: globalThis.crypto?.randomUUID?.() ?? `nuevo-${Date.now()}`,
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria.trim(),
      descripcion: formulario.descripcion.trim(),
      precio: Number(formulario.precio),
      oferta: formulario.oferta === "" ? Number(formulario.precio) : Number(formulario.oferta),
      imagen: formulario.imagen,
    };
    onAgregar(nuevo);
    setFormulario(valoresIniciales);
    setErrores({});
    setAviso(`Se agregó «${nuevo.nombre}» al catálogo. Puedes verlo en la sección Productos.`);
  }

  return (
    <section id="administrar" className="seccion-administracion py-5" aria-labelledby="tituloAdministrar">
      <div className="container py-2">
        <p className="etiqueta">Administración con React</p>
        <h2 id="tituloAdministrar" className="fw-bold mb-2">Gestionar videojuegos</h2>
        <p className="text-muted mb-4">
          Agrega o elimina productos de la lista. Los cambios se guardan solo en este navegador (demostración sin servidor).
        </p>
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div className="card tarjeta-panel h-100">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-3">Agregar un videojuego</h3>
                <form onSubmit={enviar} noValidate>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label" htmlFor="nuevoNombre">Nombre *</label>
                      <input className={`form-control ${errores.nombre ? "is-invalid" : ""}`} id="nuevoNombre" name="nombre" type="text" maxLength={70} value={formulario.nombre} onChange={cambiar} aria-invalid={Boolean(errores.nombre)} />
                      {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label" htmlFor="nuevaCategoria">Categoría *</label>
                      <input className={`form-control ${errores.categoria ? "is-invalid" : ""}`} id="nuevaCategoria" name="categoria" type="text" list="categoriasSugeridas" maxLength={35} value={formulario.categoria} onChange={cambiar} placeholder="Ej.: Acción" aria-invalid={Boolean(errores.categoria)} />
                      <datalist id="categoriasSugeridas">{[...new Set(productos.map((p) => p.categoria))].map((cat) => <option key={cat} value={cat} />)}</datalist>
                      {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label" htmlFor="nuevoPrecio">Precio normal (CLP) *</label>
                      <input className={`form-control ${errores.precio ? "is-invalid" : ""}`} id="nuevoPrecio" name="precio" type="number" min="1" step="1" value={formulario.precio} onChange={cambiar} aria-invalid={Boolean(errores.precio)} />
                      {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label" htmlFor="nuevaOferta">Precio oferta (CLP)</label>
                      <input className={`form-control ${errores.oferta ? "is-invalid" : ""}`} id="nuevaOferta" name="oferta" type="number" min="1" step="1" value={formulario.oferta} onChange={cambiar} placeholder="Opcional" aria-invalid={Boolean(errores.oferta)} />
                      {errores.oferta && <div className="invalid-feedback">{errores.oferta}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label" htmlFor="nuevaImagen">Imagen ilustrativa *</label>
                      <select className={`form-select ${errores.imagen ? "is-invalid" : ""}`} id="nuevaImagen" name="imagen" value={formulario.imagen} onChange={cambiar} aria-invalid={Boolean(errores.imagen)}>
                        {imagenes.map((imagen) => <option key={imagen.ruta} value={imagen.ruta}>{imagen.etiqueta}</option>)}
                      </select>
                      {errores.imagen && <div className="invalid-feedback">{errores.imagen}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label" htmlFor="nuevaDescripcion">Descripción *</label>
                      <textarea className={`form-control ${errores.descripcion ? "is-invalid" : ""}`} id="nuevaDescripcion" name="descripcion" rows="3" maxLength={300} value={formulario.descripcion} onChange={cambiar} aria-invalid={Boolean(errores.descripcion)} />
                      {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-acento mt-3">+ Agregar al catálogo</button>
                </form>
                {aviso && <p role="status" className={`alert mt-3 mb-0 ${aviso.startsWith("Se agregó") ? "alert-success" : "alert-warning"}`}>{aviso}</p>}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="card tarjeta-panel h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-3">
                  <h3 className="h5 fw-bold mb-0">Listado actual ({productos.length})</h3>
                  <button className="btn btn-sm btn-outline-secondary" type="button" onClick={onRestaurar}>Restaurar iniciales</button>
                </div>
                {productos.length === 0 ? (
                  <p className="text-muted">No hay productos. Agrega uno o restaura el catálogo original.</p>
                ) : (
                  <ul className="list-group list-group-flush lista-admin">
                    {productos.map((producto) => (
                      <li key={producto.id} className="list-group-item px-0 d-flex align-items-center justify-content-between gap-2">
                        <div>
                          <strong className="d-block">{producto.nombre}</strong>
                          <small className="text-muted">{producto.categoria} · {formatearPrecio(producto.oferta)}</small>
                        </div>
                        <button className="btn btn-sm btn-outline-danger flex-shrink-0" type="button" onClick={() => onEliminar(producto.id)} aria-label={`Eliminar ${producto.nombre} del catálogo`}>Eliminar</button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="small text-muted mt-3 mb-0">La opción «Restaurar iniciales» recupera los cuatro juegos originales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

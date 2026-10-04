import { useEffect, useMemo, useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  // Estados principales solicitados en la actividad: catálogo, carrito e interacción.
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [mostrarDescripciones, setMostrarDescripciones] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  // useEffect simula una fuente externa leyendo un JSON local.
  // BASE_URL hace que la ruta funcione tanto en local como en GitHub Pages.
  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        setCargando(true);
        setErrorCarga("");

        const respuesta = await fetch(`${import.meta.env.BASE_URL}data/productos.json`, {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error("No fue posible cargar el catálogo.");
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorCarga("No se pudieron cargar los productos. Intenta nuevamente.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProductos();
    return () => controller.abort();
  }, []);

  const categorias = useMemo(
    () => ["Todos", ...new Set(productos.map((producto) => producto.categoria))],
    [productos]
  );

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return productos.filter((producto) => {
      const coincideTexto = producto.nombre.toLowerCase().includes(texto);
      const coincideCategoria = categoria === "Todos" || producto.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });
  }, [productos, busqueda, categoria]);

  const cantidadCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function eliminarDelCarrito(id) {
    setCarrito((actual) =>
      actual.flatMap((item) => {
        if (item.id !== id) return [item];
        if (item.cantidad > 1) return [{ ...item, cantidad: item.cantidad - 1 }];
        return [];
      })
    );
  }

  function productoEnCarrito(id) {
    return carrito.some((item) => item.id === id);
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#inicio">
            The Storex
          </a>

          <div className="d-flex gap-2 align-items-center flex-wrap justify-content-end">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm ${categoria === cat ? "btn-warning" : "btn-outline-light"}`}
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </button>
            ))}

            <a className="btn btn-warning" href="#carrito">
              Carrito <span className="badge text-bg-dark">{cantidadCarrito}</span>
            </a>
          </div>
        </div>
      </nav>

      <header id="inicio" className="encabezado py-5">
        <div className="container text-center">
          <p className="etiqueta">Tienda de videojuegos</p>
          <h1 className="display-4 fw-bold">The Storex</h1>
          <p className="lead mx-auto texto-presentacion">
            eCommerce interactivo construido con React, useState, useEffect y renderizado condicional.
          </p>
        </div>
      </header>

      <main>
        <section className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <h2 className="h4 text-center mb-3">Buscar videojuegos</h2>
              <label className="visually-hidden" htmlFor="textoBusqueda">
                Buscar producto
              </label>
              <input
                id="textoBusqueda"
                className="form-control"
                type="search"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                placeholder="Ejemplo: Terraria"
              />

              {busqueda && (
                <p className="text-center mt-2 mb-0" aria-live="polite">
                  {productosFiltrados.length > 0
                    ? `Se encontraron ${productosFiltrados.length} producto(s).`
                    : "No se encontraron coincidencias."}
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="productos" className="container pb-5">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
            <div>
              <p className="etiqueta">Catálogo React</p>
              <h2 className="fw-bold mb-1">Productos</h2>
              <p className="text-muted mb-0">Categoría seleccionada: {categoria}</p>
            </div>

            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => setMostrarDescripciones((valorActual) => !valorActual)}
            >
              {mostrarDescripciones ? "Ocultar descripciones" : "Mostrar descripciones"}
            </button>
          </div>

          {cargando && (
            <div className="alert alert-secondary" role="status">
              Cargando productos desde el archivo JSON...
            </div>
          )}

          {!cargando && errorCarga && (
            <div className="alert alert-danger" role="alert">
              {errorCarga}
            </div>
          )}

          {!cargando && !errorCarga && (
            <ProductList
              productos={productosFiltrados}
              onAgregar={agregarAlCarrito}
              estaEnCarrito={productoEnCarrito}
              mostrarDescripciones={mostrarDescripciones}
            />
          )}
        </section>

        <Cart
          carrito={carrito}
          onEliminar={eliminarDelCarrito}
          onVaciar={() => setCarrito([])}
        />
      </main>

      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-1 fw-bold">The Storex</p>
          <p className="mb-0">Proyecto PFY2201 - Semana 8</p>
        </div>
      </footer>
    </>
  );
}

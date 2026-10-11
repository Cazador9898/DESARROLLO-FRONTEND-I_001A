import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import CatalogFilters from "./components/CatalogFilters.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import ContactForm from "./components/ContactForm.jsx";
import { filtrarProductos, obtenerCategorias } from "./utils/catalog.js";
import { CLAVE_CARRITO, CLAVE_CATALOGO, guardarAlmacenamiento, leerAlmacenamiento } from "./utils/storage.js";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [originales, setOriginales] = useState([]);
  const [catalogoListo, setCatalogoListo] = useState(false);
  const [carrito, setCarrito] = useState(() => leerAlmacenamiento(CLAVE_CARRITO, []));
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [mostrarDescripciones, setMostrarDescripciones] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  // Archivo JSON servido desde /public. BASE_URL mantiene las rutas correctas
  // tanto en localhost como bajo /NOMBRE-REPOSITORIO/ en GitHub Pages.
  useEffect(() => {
    const controller = new AbortController();

    async function cargarCatalogo() {
      try {
        setCargando(true);
        setErrorCarga("");
        const respuesta = await fetch(`${import.meta.env.BASE_URL}data/productos.json`, { signal: controller.signal });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const iniciales = await respuesta.json();
        if (!Array.isArray(iniciales)) throw new Error("El JSON no contiene un listado válido.");
        if (controller.signal.aborted) return;
        setOriginales(iniciales);
        // Cambios del usuario guardados localmente. No altera el JSON del repositorio.
        setProductos(leerAlmacenamiento(CLAVE_CATALOGO, iniciales));
        setCatalogoListo(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorCarga("No fue posible cargar el catálogo. Comprueba la conexión y vuelve a cargar.");
        }
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarCatalogo();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (catalogoListo) guardarAlmacenamiento(CLAVE_CATALOGO, productos);
  }, [catalogoListo, productos]);

  useEffect(() => {
    guardarAlmacenamiento(CLAVE_CARRITO, carrito);
  }, [carrito]);

  const categorias = useMemo(() => obtenerCategorias(productos), [productos]);
  const productosFiltrados = useMemo(
    () => filtrarProductos(productos, busqueda, categoria),
    [productos, busqueda, categoria]
  );

  useEffect(() => {
    if (!categorias.includes(categoria)) setCategoria("Todos");
  }, [categorias, categoria]);

  const cantidadCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      return existe
        ? actual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
        : [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function eliminarDelCarrito(id) {
    setCarrito((actual) => actual.flatMap((item) => {
      if (item.id !== id) return [item];
      return item.cantidad > 1 ? [{ ...item, cantidad: item.cantidad - 1 }] : [];
    }));
  }

  function agregarAlCatalogo(nuevo) {
    setProductos((actual) => [...actual, nuevo]);
    setBusqueda("");
    setCategoria("Todos");
  }

  function eliminarDelCatalogo(id) {
    setProductos((actual) => actual.filter((producto) => producto.id !== id));
    // Evita que el carrito conserve juegos eliminados del catálogo.
    setCarrito((actual) => actual.filter((producto) => producto.id !== id));
  }

  function restaurarCatalogo() {
    setProductos([...originales]);
    setCarrito((actual) => actual.filter((item) => originales.some((producto) => producto.id === item.id)));
    setBusqueda("");
    setCategoria("Todos");
  }

  return (
    <>
      <Navbar cantidadCarrito={cantidadCarrito} />

      <header id="inicio" className="encabezado">
        <div className="container py-5 py-lg-6">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <p className="etiqueta mb-3">Tu próximo juego está aquí</p>
              <h1 className="display-4 fw-bold lh-sm mb-3">Un universo de juegos, <span className="resalte">un solo lugar.</span></h1>
              <p className="lead texto-presentacion mb-4">Explora nuestro catálogo, encuentra tu género favorito y agrega tus títulos preferidos al carrito.</p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#productos" className="btn btn-acento btn-lg">Explorar catálogo</a>
                <a href="#contacto" className="btn btn-outline-light btn-lg">Contáctanos</a>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="hero-panel p-4 p-md-5" aria-label="Resumen de la tienda">
                <div className="hero-estrella mb-3" aria-hidden="true">✦</div>
                <p className="text-uppercase fw-semibold small hero-overline">The Storex / PFY2201</p>
                <div className="display-5 fw-bold">{productos.length}</div>
                <p className="mb-3 hero-sutil">Videojuegos en el catálogo</p>
                <hr />
                <p className="mb-0 hero-sutil">Búsqueda instantánea · Categorías · Carrito dinámico</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="productos" className="container py-5" aria-labelledby="tituloProductos">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
            <div>
              <p className="etiqueta">Catálogo interactivo</p>
              <h2 id="tituloProductos" className="fw-bold mb-1">Videojuegos disponibles</h2>
              <p className="text-muted mb-0">Descubre lo que tenemos para ti.</p>
            </div>
            <button type="button" className="btn btn-outline-dark align-self-start" onClick={() => setMostrarDescripciones((valor) => !valor)}>
              {mostrarDescripciones ? "Ocultar descripciones" : "Mostrar descripciones"}
            </button>
          </div>

          <CatalogFilters
            busqueda={busqueda}
            onBusqueda={setBusqueda}
            categoria={categoria}
            onCategoria={setCategoria}
            categorias={categorias}
            cantidad={productosFiltrados.length}
          />

          {cargando && <div className="alert alert-secondary" role="status">Cargando videojuegos desde el archivo JSON...</div>}
          {!cargando && errorCarga && <div className="alert alert-danger" role="alert">{errorCarga}</div>}
          {!cargando && !errorCarga && (
            <ProductList
              productos={productosFiltrados}
              onAgregar={agregarAlCarrito}
              estaEnCarrito={(id) => carrito.some((item) => item.id === id)}
              mostrarDescripciones={mostrarDescripciones}
            />
          )}
        </section>

        <Cart carrito={carrito} onEliminar={eliminarDelCarrito} onVaciar={() => setCarrito([])} />
        <AdminPanel productos={productos} onAgregar={agregarAlCatalogo} onEliminar={eliminarDelCatalogo} onRestaurar={restaurarCatalogo} />
        <ContactForm />
      </main>

      <footer className="footer-storex text-white py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <span className="fw-bold">✦ The Storex</span>
          <span className="small text-footer">Proyecto académico · Desarrollo Frontend I · PFY2201 · Evaluación final</span>
          <a href="#inicio" className="enlace-inicio small">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  );
}

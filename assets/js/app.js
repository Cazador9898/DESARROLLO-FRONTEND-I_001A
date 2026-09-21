// Datos principales de la aplicación.
let productos = [];
let carrito = [];

// Se ejecuta cuando el documento HTML ya está disponible.
document.addEventListener("DOMContentLoaded", function () {
  cargarProductos();
  configurarBusqueda();
  configurarCategorias();
  configurarVaciarCarrito();
});

// Carga el catálogo desde un JSON local mediante Fetch API.
async function cargarProductos() {
  const estado = document.getElementById("estadoCarga");
  try {
    const respuesta = await fetch("./data/juegos.json", { cache: "no-store" });
    if (!respuesta.ok) throw new Error("No fue posible obtener el archivo JSON.");

    const datos = await respuesta.json();
    if (!Array.isArray(datos) || datos.length === 0) throw new Error("El catálogo no contiene productos válidos.");

    productos = datos;
    mostrarProductos(productos);
    estado.textContent = "Productos cargados correctamente.";
  } catch (error) {
    estado.innerHTML = '<span class="mensaje-error">No se pudieron cargar los productos. Intenta nuevamente más tarde.</span>';
    console.error("Error al cargar productos:", error);
  }
}

// Crea las tarjetas en el DOM de forma reutilizable.
function mostrarProductos(lista) {
  const contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = '<div class="col-12"><div class="alert alert-info">No se encontraron productos.</div></div>';
    return;
  }

  lista.forEach(function (producto) {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6 col-lg-4";
    columna.innerHTML = `
      <article class="card card-producto h-100 shadow-sm">
        <img src="${producto.imagen}" class="card-img-top" alt="Portada ilustrativa de ${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <span class="badge text-bg-secondary align-self-start mb-2">${producto.categoria}</span>
          <h3 class="card-title h5">${producto.nombre}</h3>
          <p class="card-text">${producto.descripcion}</p>
          <p class="precio mt-auto">${formatearPrecio(producto.precio)}</p>
          <button class="btn btn-warning fw-bold btn-agregar" type="button" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      </article>`;
    contenedor.appendChild(columna);
  });

  document.querySelectorAll(".btn-agregar").forEach(function (boton) {
    boton.addEventListener("click", function () {
      agregarAlCarrito(Number(boton.dataset.id));
    });
  });
}

// Evento submit solicitado: filtra el catálogo según el texto ingresado.
function configurarBusqueda() {
  const formulario = document.getElementById("formBusqueda");
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const termino = document.getElementById("textoBusqueda").value.trim().toLowerCase();
    const mensaje = document.getElementById("mensajeBusqueda");

    if (termino === "") {
      mostrarProductos(productos);
      mensaje.textContent = "Ingresa un nombre para buscar. Se muestra el catálogo completo.";
      return;
    }

    const resultados = productos.filter(function (producto) {
      return producto.nombre.toLowerCase().includes(termino);
    });
    mostrarProductos(resultados);
    mensaje.textContent = resultados.length > 0 ? `Se encontraron ${resultados.length} producto(s).` : "No se encontraron coincidencias.";
    document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
  });
}

// Categorías simuladas de la barra de navegación.
function configurarCategorias() {
  document.querySelectorAll(".btn-categoria").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const categoria = boton.dataset.categoria;
      const filtrados = categoria === "Todos"
        ? productos
        : productos.filter(function (producto) { return producto.categoria === categoria; });
      mostrarProductos(filtrados);
      document.getElementById("estadoCarga").textContent = categoria === "Todos"
        ? "Mostrando todos los productos."
        : "Categoría seleccionada: " + categoria;
      document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Evento click: agrega un producto y actualiza el resumen del carrito.
function agregarAlCarrito(id) {
  const producto = productos.find(function (item) { return item.id === id; });
  if (!producto) return;

  const existente = carrito.find(function (item) { return item.id === id; });
  if (existente) existente.cantidad += 1;
  else carrito.push({ ...producto, cantidad: 1 });

  actualizarCarrito();
}

// Manipula el DOM para mostrar cantidad, productos y total.
function actualizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const cantidad = carrito.reduce(function (suma, item) { return suma + item.cantidad; }, 0);
  const total = carrito.reduce(function (suma, item) { return suma + item.precio * item.cantidad; }, 0);

  document.getElementById("contadorCarrito").textContent = cantidad;
  document.getElementById("cantidadResumen").textContent = cantidad;
  document.getElementById("totalCarrito").textContent = formatearPrecio(total);

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="text-muted">Aún no has agregado productos.</p>';
    return;
  }

  lista.innerHTML = "";
  carrito.forEach(function (item) {
    const fila = document.createElement("div");
    fila.className = "item-carrito";
    fila.innerHTML = `<span><strong>${item.nombre}</strong> x ${item.cantidad}</span><span>${formatearPrecio(item.precio * item.cantidad)}</span>`;
    lista.appendChild(fila);
  });
}

function configurarVaciarCarrito() {
  document.getElementById("btnVaciar").addEventListener("click", function () {
    carrito = [];
    actualizarCarrito();
  });
}

function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(valor);
}

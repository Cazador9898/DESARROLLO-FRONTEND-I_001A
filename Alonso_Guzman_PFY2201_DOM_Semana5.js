// =====================================================
// Proyecto PFY2201 - Semana 5
// Manipulación del DOM, eventos y Fetch API
// =====================================================

// Espera a que el HTML esté completamente cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function () {
    configurarEventoOferta();
    configurarEventoNoticias();
    configurarFormulario();
    cargarProductos();
});

/**
 * Configura el evento click del botón de oferta.
 * Muestra u oculta una sección modificando clases del DOM.
 */
function configurarEventoOferta() {
    const boton = document.getElementById("btnOferta");
    const oferta = document.getElementById("ofertaSemana");

    boton.addEventListener("click", function () {
        oferta.classList.toggle("d-none");

        if (oferta.classList.contains("d-none")) {
            boton.textContent = "Mostrar oferta de la semana";
        } else {
            boton.textContent = "Ocultar oferta de la semana";
        }
    });
}

/**
 * Configura un evento click para crear contenido nuevo.
 * Utiliza createElement y appendChild para modificar el DOM dinámicamente.
 */
function configurarEventoNoticias() {
    const boton = document.getElementById("btnAgregarNoticia");
    const contenedor = document.getElementById("contenedorNoticias");
    let contador = 0;

    boton.addEventListener("click", function () {
        contador++;

        const noticia = document.createElement("article");
        noticia.className = "noticia";

        const titulo = document.createElement("h3");
        titulo.className = "h6 fw-bold";
        titulo.textContent = "Noticia dinámica #" + contador;

        const texto = document.createElement("p");
        texto.className = "mb-0";
        texto.textContent = "Nuevo contenido agregado con JavaScript mediante createElement y appendChild.";

        noticia.appendChild(titulo);
        noticia.appendChild(texto);
        contenedor.appendChild(noticia);
    });
}

/**
 * Obtiene los videojuegos desde un archivo JSON utilizando Fetch API.
 * La promesa .then procesa los datos y .catch controla posibles errores.
 */
function cargarProductos() {
    const contenedor = document.getElementById("listaProductos");
    const estado = document.getElementById("estadoCarga");

    fetch("data/juegos.json")
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("No fue posible cargar los datos.");
            }
            return respuesta.json();
        })
        .then(function (juegos) {
            estado.textContent = "Datos cargados correctamente mediante Fetch API.";
            mostrarProductos(juegos, contenedor);
        })
        .catch(function (error) {
            estado.textContent = "Error al cargar los productos: " + error.message;
            estado.classList.add("text-danger");
        });
}

/**
 * Crea las tarjetas de productos dinámicamente.
 * También agrega los eventos mouseover y mouseout a cada tarjeta.
 */
function mostrarProductos(juegos, contenedor) {
    contenedor.innerHTML = "";

    juegos.forEach(function (juego) {
        const columna = document.createElement("div");
        columna.className = "col-12 col-md-6 col-lg-4";

        const tarjeta = document.createElement("article");
        tarjeta.className = "card h-100 shadow-sm";

        const imagen = document.createElement("div");
        imagen.className = "imagen-producto";
        imagen.setAttribute("aria-label", "Representación de " + juego.nombre);
        imagen.textContent = juego.icono;

        const cuerpo = document.createElement("div");
        cuerpo.className = "card-body d-flex flex-column";

        const titulo = document.createElement("h3");
        titulo.className = "card-title h4";
        titulo.textContent = juego.nombre;

        const genero = document.createElement("p");
        genero.className = "text-muted mb-2";
        genero.textContent = "Género: " + juego.genero;

        const descripcion = document.createElement("p");
        descripcion.className = "card-text";
        descripcion.textContent = juego.descripcion;

        const precio = document.createElement("p");
        precio.className = "precio mt-auto mb-0";
        precio.textContent = "$" + juego.precio.toLocaleString("es-CL");

        cuerpo.appendChild(titulo);
        cuerpo.appendChild(genero);
        cuerpo.appendChild(descripcion);
        cuerpo.appendChild(precio);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);
        contenedor.appendChild(columna);

        // Evento mouseover: destaca visualmente la tarjeta.
        tarjeta.addEventListener("mouseover", function () {
            tarjeta.classList.add("card-destacada");
        });

        // Evento mouseout: devuelve la tarjeta a su estilo normal.
        tarjeta.addEventListener("mouseout", function () {
            tarjeta.classList.remove("card-destacada");
        });
    });
}

/**
 * Valida el formulario cuando se ejecuta el evento submit.
 * Evita el envío real y muestra un mensaje creado dinámicamente.
 */
function configurarFormulario() {
    const formulario = document.getElementById("formContacto");
    const mensaje = document.getElementById("mensajeFormulario");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const juego = document.getElementById("juego").value;

        mensaje.innerHTML = "";

        if (nombre === "" || correo === "" || juego === "") {
            mostrarMensajeFormulario(
                mensaje,
                "Debes completar nombre, correo y videojuego.",
                "error"
            );
            return;
        }

        if (!correo.includes("@") || !correo.includes(".")) {
            mostrarMensajeFormulario(
                mensaje,
                "Ingresa un correo electrónico válido.",
                "error"
            );
            return;
        }

        mostrarMensajeFormulario(
            mensaje,
            "Gracias " + nombre + ". Tu consulta por " + juego + " fue registrada correctamente.",
            "exito"
        );

        formulario.reset();
    });
}

/**
 * Crea el mensaje de resultado del formulario evitando repetir código.
 */
function mostrarMensajeFormulario(contenedor, texto, tipo) {
    const aviso = document.createElement("div");
    aviso.textContent = texto;

    if (tipo === "exito") {
        aviso.className = "mensaje-exito";
    } else {
        aviso.className = "mensaje-error";
    }

    contenedor.appendChild(aviso);
}

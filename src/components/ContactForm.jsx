import { useState } from "react";
import { validarContacto } from "../utils/validators.js";

const vacio = { nombre: "", email: "", mensaje: "" };

// Opcional: configura VITE_CONTACT_EMAIL durante la compilación de producción.
// Sin correo real configurado, el formulario funciona en modo demostración.
const DESTINATARIO = (import.meta.env.VITE_CONTACT_EMAIL ?? "").trim();

export default function ContactForm() {
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [resultado, setResultado] = useState("");

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
    setErrores((anterior) => ({ ...anterior, [name]: undefined }));
    setResultado("");
  }

  function enviar(evento) {
    evento.preventDefault();
    const erroresActuales = validarContacto(datos);
    setErrores(erroresActuales);
    setResultado("");
    if (Object.keys(erroresActuales).length > 0) return;

    if (DESTINATARIO) {
      const asunto = encodeURIComponent("Contacto desde The Storex");
      const mensaje = encodeURIComponent(`Nombre: ${datos.nombre.trim()}\nCorreo: ${datos.email.trim()}\n\n${datos.mensaje.trim()}`);
      // GitHub Pages es estático: el usuario debe confirmar el envío desde su cliente de correo.
      window.location.href = `mailto:${DESTINATARIO}?subject=${asunto}&body=${mensaje}`;
      setResultado("Datos validados. Revisa tu aplicación de correo y confirma el envío del mensaje.");
    } else {
      setResultado("Formulario validado correctamente. Modo demostración: no se envió ningún mensaje porque no hay correo de destino configurado.");
    }
    setDatos(vacio);
  }

  return (
    <section id="contacto" className="seccion-contacto py-5" aria-labelledby="tituloContacto">
      <div className="container py-2">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-5">
            <p className="etiqueta">Estamos para ayudarte</p>
            <h2 id="tituloContacto" className="display-6 fw-bold">Hablemos de videojuegos.</h2>
            <p className="contacto-subtitulo">¿Tienes una consulta o una sugerencia? Completa el formulario. Todos los campos son obligatorios.</p>
            <div className="aviso-demo p-3 rounded-3">
              <strong>Información de contacto</strong>
              <p className="mb-0 mt-1 small">
                {DESTINATARIO
                  ? "Al validar tus datos, se abrirá tu programa de correo para que confirmes el envío."
                  : "Versión académica: el formulario valida los datos, pero no envía mensajes reales hasta configurar un correo de destino."}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="card tarjeta-contacto shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h3 className="h4 fw-bold mb-4">Formulario de contacto</h3>
                <form onSubmit={enviar} noValidate>
                  <div className="mb-3">
                    <label htmlFor="contactoNombre" className="form-label fw-semibold">Nombre</label>
                    <input id="contactoNombre" name="nombre" type="text" autoComplete="name" maxLength="90" className={`form-control ${errores.nombre ? "is-invalid" : ""}`} value={datos.nombre} onChange={cambiar} aria-invalid={Boolean(errores.nombre)} aria-describedby={errores.nombre ? "errorNombre" : undefined} />
                    {errores.nombre && <div id="errorNombre" className="invalid-feedback">{errores.nombre}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactoEmail" className="form-label fw-semibold">Correo electrónico</label>
                    <input id="contactoEmail" name="email" type="email" autoComplete="email" maxLength="120" className={`form-control ${errores.email ? "is-invalid" : ""}`} value={datos.email} onChange={cambiar} aria-invalid={Boolean(errores.email)} aria-describedby={errores.email ? "errorEmail" : undefined} />
                    {errores.email && <div id="errorEmail" className="invalid-feedback">{errores.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactoMensaje" className="form-label fw-semibold">Mensaje</label>
                    <textarea id="contactoMensaje" name="mensaje" rows="5" maxLength="2000" className={`form-control ${errores.mensaje ? "is-invalid" : ""}`} value={datos.mensaje} onChange={cambiar} aria-invalid={Boolean(errores.mensaje)} aria-describedby={errores.mensaje ? "errorMensaje" : undefined} placeholder="Cuéntanos en qué podemos ayudarte..." />
                    {errores.mensaje && <div id="errorMensaje" className="invalid-feedback">{errores.mensaje}</div>}
                  </div>
                  <button className="btn btn-acento btn-lg w-100" type="submit">Validar y enviar consulta</button>
                </form>
                {resultado && <p className="alert alert-success mt-3 mb-0" role="status">{resultado}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

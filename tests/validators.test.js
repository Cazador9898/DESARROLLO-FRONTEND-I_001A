import test from "node:test";
import assert from "node:assert/strict";
import { validarContacto, validarVideojuego } from "../src/utils/validators.js";
import { filtrarProductos, obtenerCategorias } from "../src/utils/catalog.js";

const valido = {
  nombre: "Nuevo videojuego",
  categoria: "Estrategia",
  precio: "15000",
  oferta: "11990",
  descripcion: "Gestiona tu imperio y construye ciudades.",
  imagen: "assets/img/cities.svg",
};

test("valida contacto correctamente", () => {
  assert.deepEqual(validarContacto({ nombre: "Alonso", email: "persona@example.com", mensaje: "Hola, una consulta sobre juegos." }), {});
  const errores = validarContacto({ nombre: "A", email: "incorrecto", mensaje: "corto" });
  assert.ok(errores.nombre && errores.email && errores.mensaje);
});

test("valida agregar videojuegos y reglas de precio", () => {
  assert.deepEqual(validarVideojuego(valido), {});
  assert.deepEqual(validarVideojuego({ ...valido, oferta: "" }), {});
  assert.ok(validarVideojuego({ ...valido, oferta: "15990" }).oferta);
  assert.ok(validarVideojuego({ ...valido, precio: "-2" }).precio);
  assert.ok(validarVideojuego({ ...valido, precio: "15.5" }).precio);
  assert.ok(validarVideojuego({ ...valido, imagen: "https://otro.example.com/image.svg" }).imagen);
});

test("filtra por nombre sin distinción de mayúsculas ni espacios, y por categoría", () => {
  const datos = [
    { nombre: "Terraria", categoria: "Acción" },
    { nombre: "Stardew Valley", categoria: "Simulación" },
    { nombre: "Halo", categoria: "Acción" },
  ];
  assert.equal(filtrarProductos(datos, "  HAL  ", "Todos").length, 1);
  assert.equal(filtrarProductos(datos, "", "Acción").length, 2);
  assert.equal(filtrarProductos(datos, "stardew", "Acción").length, 0);
  assert.deepEqual(obtenerCategorias(datos), ["Todos", "Acción", "Simulación"]);
});

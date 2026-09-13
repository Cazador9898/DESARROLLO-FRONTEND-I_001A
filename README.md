# PFY2201 - Semana 5
## Manipulando el DOM con JavaScript para mejorar la interactividad

**Alumno:** Alonso Guzmán  
**Asignatura:** Desarrollo Frontend I (PFY2201)  
**Proyecto:** The Storex  

## Objetivo

Continuar el proyecto de las semanas anteriores incorporando JavaScript para manipular el DOM, implementar eventos y cargar información mediante Fetch API.

## Funcionalidades implementadas

1. **Manipulación del DOM**
   - Creación dinámica de noticias mediante `createElement` y `appendChild`.
   - Creación dinámica de las tarjetas de videojuegos a partir de datos JSON.
   - Modificación de clases y textos mediante JavaScript.

2. **Eventos**
   - `click`: mostrar/ocultar la oferta semanal.
   - `click`: agregar noticias dinámicas.
   - `mouseover` y `mouseout`: destacar las tarjetas de videojuegos.
   - `submit`: validar el formulario de contacto y mostrar el resultado.

3. **Fetch API**
   - Carga de datos desde `data/juegos.json`.
   - Uso de promesas con `.then()` y `.catch()`.
   - Manejo de errores durante la carga.

4. **Buenas prácticas**
   - Código organizado en funciones reutilizables.
   - Comentarios en las funciones principales.
   - Separación de HTML, CSS, JavaScript y datos JSON.
   - Diseño responsivo mediante Bootstrap 5.

## Archivos principales

- `index.html`: archivo principal para GitHub Pages.
- `Alonso_Guzman_PFY2201_DOM_Semana5.html`: archivo HTML solicitado para la entrega.
- `Alonso_Guzman_PFY2201_DOM_Semana5.js`: JavaScript de la actividad.
- `Alonso_Guzman_PFY2201_CSS_Semana5.css`: estilos personalizados.
- `data/juegos.json`: datos cargados mediante Fetch API.
- `capturas/`: carpeta para guardar las evidencias.

## Ejecución

Debido a que el proyecto utiliza `fetch()` para leer un archivo JSON, se recomienda abrirlo mediante un servidor local y no directamente con doble clic.

### Visual Studio Code + Live Server
1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server** si aún no está instalada.
3. Hacer clic derecho sobre `index.html`.
4. Seleccionar **Open with Live Server**.

También funcionará correctamente cuando esté publicado mediante GitHub Pages.

## Capturas recomendadas

Guardar en la carpeta `capturas` evidencias de:

1. Página inicial y catálogo cargado mediante Fetch API.
2. Oferta semanal visible después del evento `click`.
3. Tarjeta destacada al posicionar el mouse sobre ella (`mouseover`).
4. Noticia creada dinámicamente.
5. Formulario mostrando un mensaje de validación o de envío correcto.

## GitHub Pages

Subir todos los archivos a la rama `main` y publicar el sitio mediante GitHub Pages usando una rama `gh-pages`, de acuerdo con las instrucciones de la actividad.

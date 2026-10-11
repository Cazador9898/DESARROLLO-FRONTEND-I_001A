# The Storex | Evaluación Final Transversal (Semana 9)

**Alumno:** Alonso Guzmán Ruz  
**Asignatura:** Desarrollo Frontend I (PFY2201)  
**Tecnologías:** HTML5, CSS3, JavaScript, React 19, Vite 7 y Bootstrap 5.

Sitio académico para una tienda de videojuegos. Se desarrolló a partir del proyecto de **Semana 8**, conservando el catálogo original, el carrito y la búsqueda, e incorporando los requerimientos finales de Semana 9.

## Funcionalidades

- Inicio con barra de navegación hacia **Inicio**, **Catálogo**, **Administrar**, **Carrito** y **Contacto**.
- Tarjetas de videojuegos generadas desde `public/data/productos.json` (imagen, categoría, nombre, descripción y precios en pesos chilenos).
- Filtros dinámicos por categoría y búsqueda por nombre.
- Botón que muestra u oculta las descripciones de las tarjetas.
- Carrito con botón para agregar, quitar unidades y vaciar; total y contador se recalculan con React.
- Panel de administración académico que permite **agregar y eliminar videojuegos** con controles de validación, y recuperar el catálogo original.
- Formulario de contacto con validación personalizada del nombre, correo y mensaje, y mensajes de error comprensibles.
- React con componentes separados, **useState**, **useEffect**, **useMemo** y comunicación con **props**.
- HTML semántico, Flexbox y grilla responsiva Bootstrap 5 para escritorio, tablet y teléfono.
- Persistencia del carrito y de cambios del catálogo usando `localStorage`, por navegador (sin servidor).
- Construcción compatible con **GitHub Pages**, sin React Router ni rutas absolutas.

## Estructura del proyecto

```text
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── .nojekyll
│   ├── data/productos.json
│   └── assets/img/*.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CatalogFilters.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   ├── AdminPanel.jsx
│   │   └── ContactForm.jsx
│   └── utils/
│       ├── catalog.js
│       ├── formatters.js
│       ├── storage.js
│       └── validators.js
└── tests/validators.test.js
```

## Requisitos

Node.js **20.19+ o 22.12+**, npm y un navegador web actualizado.

## Instalación y uso

1. Abre la carpeta que contiene `package.json` en VS Code.
2. Abre una terminal en esa carpeta e instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:

   ```bash
   npm run dev
   ```

4. Abre la dirección que indica la terminal, por ejemplo `http://localhost:5173/`.

### Pruebas y compilación

```bash
npm test
npm run build
npm run preview
```

`npm test` ejecuta pruebas automatizadas del filtrado y validaciones. `npm run build` genera la carpeta `dist/` lista para publicación.

## Publicar en GitHub Pages (método con gh-pages)

El proyecto **ya está configurado** para funcionar dentro de cualquier nombre de repositorio: `vite.config.js` usa `base: './'` y los recursos públicos se referencian con `import.meta.env.BASE_URL`. Bootstrap se incluye en el bundle, sin depender de CDN. Los enlaces internos utilizan `#anclas`, así que no requieren configuración de redirección.

1. Crea un repositorio **público** en GitHub (o usa uno existente). Asegúrate de que su rama principal contenga este proyecto.
2. Desde la terminal en la carpeta con `package.json`, ejecuta:

   ```bash
   git init
   git add .
   git commit -m "EFT Semana 9: The Storex React, contacto y catálogo dinámico"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

   **Importante:** Si el repositorio ya estaba inicializado o ya tiene un remoto `origin`, omite `git init` y `git remote add origin`. Utiliza `git remote -v` para comprobarlo. No reemplaces por error el historial de un repositorio anterior.

3. Publica el sitio:

   ```bash
   npm install
   npm run deploy
   ```

   `npm run deploy` construye el proyecto y publica los archivos generados en la rama `gh-pages` (requiere autorización de GitHub en el equipo).

4. En GitHub abre **Settings > Pages**:
   - **Source:** Deploy from a branch.
   - **Branch:** `gh-pages`.
   - **Folder:** `/ (root)`.
5. Guarda y espera a que la publicación finalice. La dirección suele tener este formato:

   ```text
   https://TU_USUARIO.github.io/TU_REPOSITORIO/
   ```

6. Entra a la URL publicada y prueba: imágenes, filtros, carrito, administración, formulario y navegación.

> **Cada cambio posterior:** `git add .`, `git commit -m "mensaje"`, `git push` y `npm run deploy` para actualizar el sitio público.

## Formulario de contacto en GitHub Pages

GitHub Pages aloja **sitios estáticos** y no ofrece un backend para recibir mensajes. Por eso, el formulario **sí valida** nombre, email y mensaje pero, **de manera predeterminada**, presenta una confirmación de demostración y **no envía correos reales**.

Para habilitar el envío a través del **cliente de correo instalado del visitante** (el visitante confirma manualmente el envío):

1. Crea un archivo `.env.local` en la carpeta principal, con un correo propio real:

   ```env
   VITE_CONTACT_EMAIL=tu_correo_real@dominio.cl
   ```

2. Ejecuta `npm run deploy` para publicar la versión con destinatario configurado.
3. Al enviar el formulario válido se abrirá la aplicación de correo del visitante con asunto y mensaje ya escritos. Si no tiene cliente de correo configurado, podría no abrirse.

**No coloques claves ni contraseñas en variables `VITE_`: sus valores aparecen en el JavaScript público.** Si necesitas enviar formularios sin depender del correo del visitante, tendrás que incorporar un servicio externo de formularios o un backend.

## Persistencia y alcance académico

Los productos agregados/eliminados y el carrito se guardan en `localStorage` **solo para cada visitante y navegador**. No se modifica el JSON ni se comparten esos cambios entre usuarios; no existe base de datos o panel de administración con autenticación. "Restaurar iniciales" recupera los cuatro juegos del JSON original. El carrito no procesa pagos reales.

## Guion para la presentación en video MP4

Se recomienda mostrar la aplicación **y el código** en un recorrido continuo:

1. Presentación del proyecto The Storex y estructura de carpetas (`src/components`, `src/utils`, `public/data`).
2. Vista inicial y cómo se construye el layout responsivo con HTML semántico, CSS y Bootstrap.
3. Carga del catálogo desde JSON con `fetch`, `useEffect` y `BASE_URL` compatible con GitHub Pages.
4. Búsqueda y filtros por categoría: `useState`, `useMemo`, funciones de filtrado y renderizado dinámico de `ProductList` / `ProductCard`.
5. Agregar videojuegos al carrito, quitar unidades, vaciar y mostrar el cálculo del total.
6. Abrir "Administrar", agregar un juego válido, mostrarlo en el catálogo y eliminarlo; luego restaurar los originales.
7. En "Contacto", mostrar errores por campos vacíos o formato inválido, y después un ejemplo válido. Aclarar que el modo demostración no envía correos.
8. Mostrar `npm test`, `npm run build`, README.md, commits del repositorio y sitio publicado en GitHub Pages.

## Lista de verificación de la entrega

- [ ] Repositorio público con los archivos fuente y commits descriptivos.
- [ ] GitHub Pages accesible y funcionando desde una URL pública.
- [ ] ZIP con esta carpeta del proyecto, incluyendo README.md y recursos, **sin** `node_modules/` ni `dist/`.
- [ ] Video **MP4** donde se vean diseño, funcionalidades, validaciones, código y página pública.

**Nombre solicitado para el ZIP:** `Alonso_Guzman_PFY2201_EFT_FRONT_END_I.zip`.

# The Storex - PFY2201 Semana 8

Proyecto eCommerce desarrollado con React + Vite para la evaluación sumativa de Semana 8 de Desarrollo Frontend I.

## Funcionalidades evaluadas

- Catálogo administrado con `useState`.
- Productos cargados dinámicamente desde `public/data/productos.json` mediante `useEffect`.
- Búsqueda por nombre y filtro por categoría.
- Carrito administrado con `useState`: agregar, descontar unidades y vaciar.
- Contador de unidades y total de compra.
- Renderizado condicional para carga, errores, búsquedas, carrito vacío y estado "En el carrito".
- Botón interactivo para mostrar u ocultar las descripciones del catálogo.
- Componentes reutilizables y utilidad compartida para dar formato a precios.
- Configuración compatible con GitHub Pages.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Luego abre la dirección que indique Vite, normalmente `http://localhost:5173/`.

## Comprobar la versión de producción

```bash
npm run build
npm run preview
```

## Publicar en GitHub Pages

El proyecto usa `vite.config.js` con `base: './'`, por lo que los recursos funcionan aunque el sitio se publique dentro de una ruta de repositorio de GitHub Pages.

1. Sube el proyecto a un repositorio público de GitHub.
2. Ejecuta una vez:

```bash
npm install
```

3. Publica el build:

```bash
npm run deploy
```

El script genera `dist` y publica esa carpeta en la rama `gh-pages`.

4. En GitHub entra a **Settings > Pages** y configura:
   - **Source:** Deploy from a branch.
   - **Branch:** `gh-pages`.
   - **Folder:** `/ (root)`.

5. Guarda y espera a que GitHub habilite el enlace público.

## Evidencias sugeridas para AVA

Toma capturas donde se vea:

1. El catálogo cargado desde el JSON.
2. Uno o más productos agregados al carrito y el contador actualizado.
3. El carrito vacío y/o el cambio del botón a "En el carrito · agregar otro".
4. El sitio funcionando desde la URL pública de GitHub Pages.

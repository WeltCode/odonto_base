# odonto_base

**Landing page open source para una plataforma de gestión de clínicas dentales.**

`odonto_base` es una página de aterrizaje (marketing site) en español que presenta una plataforma —ficticia y personalizable— de gestión para clínicas dentales: agenda de citas, expedientes clínicos, gestión de personal y portal del paciente. Está pensada como base open source: clónala, ponle tu marca y publícala como tuya.

> ⚠️ **Nota:** este repositorio es únicamente el **sitio web promocional**. Todos los datos que aparecen en pantalla (citas, estadísticas, expedientes) son **datos de muestra** hardcodeados y etiquetados como tales. No incluye backend ni la aplicación de gestión real.

## Stack

- **React 19** + **Vite 8** (HMR)
- **Tailwind CSS 4** (vía `@tailwindcss/vite`, tokens de diseño definidos con `@theme` en [`src/index.css`](src/index.css))
- **Oxlint** para linting
- SPA de una sola página, sin router ni backend. Idioma: español.

## Secciones

La página se compone en [`src/App.jsx`](src/App.jsx) a partir de estos componentes:

| Componente | Descripción |
|---|---|
| `Navbar`      | Barra fija con barra de progreso de scroll y menú móvil |
| `Hero`        | Portada con odontograma decorativo y vista previa de la agenda |
| `Stats`       | Métricas con contador animado al entrar en viewport |
| `FeatureRail` | Las 4 funciones clave (citas, expedientes, personal, portal) en riel horizontal |
| `Roles`       | Los 4 roles: dueño, dentista, recepcionista y paciente |
| `HowItWorks`  | Puesta en marcha en 3 pasos |
| `OpenSource`  | Licencia MIT, marca propia y arquitectura extensible |
| `CTA`         | Llamada a la acción final |
| `Footer`      | Pie con enlaces de navegación |

## Diseño

Identidad visual "clínica/documental": líneas regladas tipo expediente, sellos de goma, un odontograma FDI como motivo recurrente. Paleta azul tinta con acento rojo. Tipografías **Epilogue** (títulos) e **Inter** (texto), servidas desde Google Fonts.

## Desarrollo

Requiere Node.js 18+.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo con HMR
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
npm run lint     # ejecutar Oxlint
```

## Personalización

- **Marca y colores:** edita los tokens en [`src/index.css`](src/index.css) (`--color-ink`, `--color-stamp`, tipografías, etc.).
- **Textos y datos:** el contenido vive en constantes al inicio de cada componente en [`src/components/`](src/components/).

## Licencia

MIT.

# odonto_base

**Plataforma de gestión en la nube para clínicas dentales** — un servicio SaaS de [WeltBrave](https://weltbrave.com).

`odonto_base` es una plataforma en español que centraliza la operación de una clínica dental: agenda de citas, expedientes clínicos, gestión de personal y portal del paciente. Se ofrece como **servicio gestionado por suscripción** — la clínica accede desde el navegador, con su propia marca, sin instalaciones ni servidores que administrar.

> **Estado actual:** este repositorio contiene por ahora el **sitio de presentación (landing)**. Los datos que aparecen en pantalla son de ejemplo. El desarrollo de la plataforma funcional (MVP: agenda + expedientes) está en marcha.

## Stack

- **React 19** + **Vite 8** (HMR)
- **Tailwind CSS 4** (vía `@tailwindcss/vite`, tokens de diseño con `@theme` en [`src/index.css`](src/index.css))
- **Oxlint** para linting
- SPA de una sola página. Idioma: español.

## Secciones de la landing

Se componen en [`src/App.jsx`](src/App.jsx):

| Componente | Descripción |
|---|---|
| `Navbar`      | Barra fija con barra de progreso de scroll y menú móvil |
| `Hero`        | Portada con odontograma decorativo y vista previa de la agenda |
| `Stats`       | Métricas de la plataforma con contador animado |
| `FeatureRail` | Las 4 funciones clave (citas, expedientes, personal, portal) en riel horizontal |
| `Roles`       | Los 4 roles: dueño, dentista, recepcionista y paciente |
| `HowItWorks`  | Puesta en marcha en 3 pasos |
| `Platform`    | Propuesta de valor: plataforma gestionada, tu marca, seguridad |
| `CTA`         | Llamada a la acción final |
| `Footer`      | Pie con enlaces y badge "Powered by WeltBrave" |

## Diseño

Identidad visual "clínica/documental": líneas regladas tipo expediente, sellos de goma, un odontograma FDI como motivo recurrente. Paleta azul tinta con acento rojo. Tipografías **Epilogue** (títulos) e **Inter** (texto).

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

- **Marca y colores:** tokens en [`src/index.css`](src/index.css) (`--color-ink`, `--color-stamp`, tipografías).
- **Textos y datos:** constantes al inicio de cada componente en [`src/components/`](src/components/).

---

© 2026 WeltBrave. Proyecto privado. Todos los derechos reservados.

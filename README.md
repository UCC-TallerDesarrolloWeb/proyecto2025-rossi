# Burger House

## Índice

- [Descripción](#descripción)
- [Estructura general](#estructura-general)
- [Primera entrega](#primera-entrega)
- [Segunda entrega](#segunda-entrega)
- [Tecnologías](#tecnologías)
- [Funcionalidades](#funcionalidades)
- [Ejecución](#ejecución)
- [Autor](#autor)

## Descripción

**Burger House** es el sitio web de una hamburguesería desarrollado en dos etapas: una versión inicial con tecnologías web nativas y una migración completa a React.

## Estructura general

```text
proyecto2025-rossi/
├── primera_entrega/
├── segunda_entrega/
└── README.md
```

## Primera entrega

La primera etapa utiliza **HTML, CSS y JavaScript**. Está compuesta por cinco páginas separadas, un formulario validado y un carrito persistente con `localStorage`.

### Cómo abrirla

Abrir `primera_entrega/index.html` en un navegador o utilizar Live Server.

## Segunda entrega

La segunda etapa migra el sitio a **React con Vite** e incorpora React Router DOM, rutas hijas mediante `Outlet`, hooks, lectura con Fetch desde `db.json`, Sass, alias de importación, componentes reutilizables, validaciones en tiempo real y persistencia con `localStorage`.

## Tecnologías

| Entrega | Tecnologías principales |
|---|---|
| Primera | HTML5, CSS3, JavaScript, LocalStorage |
| Segunda | React, Vite, React Router DOM, Sass, Fetch, LocalStorage, ESLint |

## Funcionalidades

- Navegación entre Home, Menú, Sucursales, Contacto y Carrito.
- Menú de hamburguesas leído desde `db.json`.
- Cálculo de precios según medallones, papas y bebida.
- Carrito persistente con eliminación individual y vaciado completo.
- Listado de sucursales leído desde `db.json`.
- Formulario de contacto con validaciones accesibles en tiempo real.

## Ejecución

### Primera entrega

1. Entrar en `primera_entrega`.
2. Abrir `index.html` o utilizar Live Server.

### Segunda entrega

1. Entrar en `segunda_entrega`.
2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar Vite:

   ```bash
   npm run dev
   ```

4. Abrir la URL indicada por Vite.

Para revisar el código con ESLint:

```bash
npm run lint
```

## Autor

Lorenzo Rossi Bossio


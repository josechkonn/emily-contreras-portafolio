# Emily Contreras — Portafolio

*Diseño que cuenta tu historia.*

Portafolio de Emily Contreras, diseñadora. Por ahora tiene la identidad y el hero; el porqué de cada decisión está en [IDENTIDAD.md](IDENTIDAD.md).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # revisa tipos y compila a dist/
npm run preview
```

## Editar el contenido

Todo el texto vive en [`src/site.ts`](src/site.ts), en español y en inglés.

## Estructura

```
src/
├── components/   # Top (hero, destello, sello)
├── lib/          # i18n, titular que llena el ancho
└── site.ts       # Contenido en español e inglés
public/           # Fuentes, foto del hero, favicon
```

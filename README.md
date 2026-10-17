# Starter

Base for small apps and experiments: React, TypeScript, Vite, Tailwind v4, shadcn/ui and Lucide, with a dark minimal theme and GitHub Pages deploy.

## New app

1. On GitHub, **Use this template** → new repo.
2. Clone, `npm install`, `npm run dev`.
3. Set the subdomain in `public/CNAME` and the `<title>` in `index.html`.
4. Replace the stage in `src/App.tsx`. Keep the rail, sheet and toolbar if they fit.
5. In the repo settings, set Pages → Source to **GitHub Actions**, and add a DNS CNAME for the subdomain pointing at `veryrobert.github.io`.
6. Add the app to the index: a file in `index/src/content/projects/`.

## Adding components

```bash
npx shadcn@latest add dialog popover
```

Style rules for people and Claude are in `CLAUDE.md`.

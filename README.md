# React + Vite + Tailwind CSS + Jest

This template provides a minimal setup to get React, Tailwind CSS and jest working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Installation

```bash
pnpm install
```

---

# for github pages

Modify the `base` field in `vite.config.js` to your repo name. For example, if your repo name is `my-repo`, the `base` field should be `/my-repo/`.


```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'your repo name',
  plugins: [react()],
});
```

If your don't want it to be deployed while branch `main` is pushed, remove those lines in `.github/workflows/deploy.yml`:

```diff
# Simple workflow for deploying static content to GitHub Pages
name: Deploy to GitHub Pages

on:
-  # Runs on pushes targeting the default branch
-  push:
-    branches: ['main']
```

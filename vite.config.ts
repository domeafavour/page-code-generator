/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  // for github pages
  base: "/page-code-generator/",
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      include: /\.svg$/,
    }),
  ],
  test: {
    globals: true,
    clearMocks: true,
    environment: "happy-dom",
  },
});

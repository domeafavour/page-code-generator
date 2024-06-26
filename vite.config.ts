/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  // for github pages
  base: "/page-code-generator/",
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    clearMocks: true,
    environment: "happy-dom",
  },
});

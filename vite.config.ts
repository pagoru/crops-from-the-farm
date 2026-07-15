import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  clearScreen: false,
  server: {
    port: 5958,
  },
  plugins: [react()],
  root: "./src",
  base: "./",
  publicDir: "assets",
  build: {
    outDir: "../build",
    emptyOutDir: true, // also necessary
  },
  resolve: {
    alias: {
      modules: "/modules",
      shared: "/shared",
    },
  },
  optimizeDeps: {
    exclude: ["@oh/pixi-components"],
  },
});

import { defineConfig } from "vite"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx()],
  clearScreen: false,

  server: {
    host: "::",
    port: 8533,
    strictPort: true,
    https: false,
    // open browser manually
    open: false,
    // build dependencies everytime
    force: false,
  },

  build: {
    // https://caniuse.com/es6-module
    target: "modules",
    cssCodeSplit: true,
    sourcemap: false,
  },
})

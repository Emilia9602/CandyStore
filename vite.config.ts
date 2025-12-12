import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        product: resolve(__dirname, "product-page.html"),
        checkout: resolve(__dirname, "checkout-page.html"),
        complete: resolve(__dirname, "order-complete-page.html"),
      },
    },
  },
});

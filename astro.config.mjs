import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react()],
  devToolbar: { enabled: false },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    format: ["avif", "webp"],
  },
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
});

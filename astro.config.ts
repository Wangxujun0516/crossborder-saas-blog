import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://crossbordersaas.com",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
});

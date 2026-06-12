import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://web.blogx.de5.net",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  trailingSlash: "never",
});

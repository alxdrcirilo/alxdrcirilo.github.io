export default defineNuxtConfig({
  app: {
    head: {
      title: "Alexandre Cirilo - Personal Blog",
      meta: [
        {
          name: "description",
          content:
            "Personal blog of Alexandre Cirilo. Sharing my thoughts and experiences.",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
      script: [
        {
          src: "//gc.zgo.at/count.js",
          async: true,
          "data-goatcounter": "https://alxdrcirilo.goatcounter.com/count",
        },
      ],
    },
  },
  devtools: { enabled: false },
  compatibilityDate: "2025-08-06",
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/content", "@nuxt/icon", "@nuxt/image", "@nuxtjs/color-mode"],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "vitesse-light",
            "dark-mode": "vitesse-dark",
          },
          langs: ["js", "json", "makefile", "py", "rs", "shell", "toml", "xml"],
        },
      },
    },
  },
  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: {
      collections: ["fa"],
    },
  },
});

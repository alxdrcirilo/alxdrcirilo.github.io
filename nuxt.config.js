// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/css/main.css",
  ],

  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
  ],

  colorMode: {
    preference: "light",
    fallback: "light",
  },

  mdc: {
    highlight: {
      langs: [
        "js",
        "json",
        "makefile",
        "python",
        "shell",
        "toml",
        "xml",
      ],
    },
  },

  content: {
    highlight: {
      theme: "dark-plus",
    },
    markdown: {
      toc: {
        title: "Table of Contents",
        depth: 5,
        searchDepth: 3,
      }
    }
  },

  nitro: {
    prerender: {
      routes: [
        "/rss.xml",
      ]
    }
  },

  compatibilityDate: "2024-09-18"
});
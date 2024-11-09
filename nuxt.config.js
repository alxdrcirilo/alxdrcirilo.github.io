// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' },
      ],
    },
  },
  compatibilityDate: '2024-09-18',
  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@nuxt/image'],
  mdc: {
    highlight: {
      langs: [
        'js',
        'json',
        'makefile',
        'python',
        'rust',
        'shell',
        'toml',
        'xml',
      ],
    },
  },
  content: {
    highlight: {
      theme: {
        'default': 'vitesse-light',
        'dark-mode': 'dark-plus',
      },
    },
    markdown: {
      toc: {
        title: 'Table of Contents',
        depth: 5,
        searchDepth: 3,
      },
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/rss.xml',
      ],
    },
  },
})
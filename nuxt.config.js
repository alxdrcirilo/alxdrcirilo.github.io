// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css',
          integrity: 'sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer'
        },
      ],
      script: [
        {
          src: '//gc.zgo.at/count.js',
          async: true,
          'data-goatcounter': 'https://alxdrcirilo.goatcounter.com/count'
        }
      ]
    },
  },
  compatibilityDate: '2024-09-18',
  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/image'
  ],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
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
        default: 'vitesse-light',
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
      routes: ['/rss.xml'],
    },
  },
})
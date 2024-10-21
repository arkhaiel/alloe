import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/content',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@primevue/nuxt-module',
    'nuxt-authorization',
  ],
  devtools: { enabled: true },
  css: [
    'primeicons/primeicons.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  hub: {
    database: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  primevue: {
    usePrimeVue: true,
    options: {
      theme: {
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities',
        },
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
    },
  },
})

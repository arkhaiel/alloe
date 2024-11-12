export default defineNuxtConfig({
  colorMode: {
    classSuffix: '',
  },
  compatibilityDate: '2024-07-30',
  devtools: { enabled: true },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  future: { compatibilityVersion: 4 },
  hub: {
    database: true,
  },
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/content',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-authorization',
    '@nuxt/ui-pro'
  ],
})

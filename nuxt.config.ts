export default defineNuxtConfig({
    ssr: false,
    devtools: false,
    hooks: {
        close: () => {
            process.exit()
        }
    },
    modules: [
      '@nuxt/ui',
      '@nuxtjs/supabase',
    ],
    runtimeConfig: {
      public: {
        SUPBASE_URL: '',
        SUPBASE_KEY: ''
      }
    },
    supabase: {
      redirectOptions: {
        login: '/login',
        callback: '/confirm',
        exclude: ['/']
      }
    }
  })
  
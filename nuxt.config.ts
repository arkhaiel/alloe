export default defineNuxtConfig({
    ssr: false,
    devtools: false,
    vue: {
        compilerOptions: {
            whitespace: 'preserve'
        }
    },
    hooks: {
        close: () => {
            process.exit()
        }
    },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/supabase',
        '@vueuse/nuxt',
        '@nuxt/content',
    ],
    runtimeConfig: {
      public: {
        SUPBASE_URL: '',
        SUPBASE_KEY: ''
      }
    },
    content: {
        experimental: {
            clientDB: true
        },
        api: {
            baseURL: '/api/_content'
        },
        documentDriven: {
            injectPage: false
        },
        navigation: {
            fields: ['date']
        },
        sources: {
            // overwrite default source AKA `content` directory
            content: {
                driver: 'fs',
                prefix: '/news', // All contents inside this source will be prefixed with `/docs`
                base: 'content'
            }
        },
    },
    supabase: {
      redirectOptions: {
        login: '/login',
        callback: '/confirm',
        exclude: ['/', '/news/*', '/news', '/cgu', '/cgu/*']
      }
    }
  })
  
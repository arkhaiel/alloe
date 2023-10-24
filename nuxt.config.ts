export default defineNuxtConfig({
    app: {
        head: {
            meta: [{
                "name": "viewport",
                "content": "width=device-width, initial-scale=1"
            },
            {
                "charset": "utf-8"
            }],
            title: "alloé: allez, on écrit !"
        }, 
    },
    typescript: {
        strict: true
    },
    ssr: false,
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
        '@pinia/nuxt',
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

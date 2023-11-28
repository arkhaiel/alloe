import { resolve } from 'pathe'

export default defineNuxtConfig({
    devtools: { enabled: false },
    extends: ['@nuxt/ui-pro'],
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
        '@nuxt/content',
        '@nuxt/ui',
        '@nuxtjs/supabase',
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/mdc'
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
            fields: ['date', 'version']
        },
    },
    supabase: {
      redirectOptions: {
        login: '/login',
        callback: '/confirm',
        exclude: ['/', '/news/*', '/news', '/cgu', '/cgu/*', '/lire', '/lire/*']
      }
    },
    ui: {
        global: true
    }
  })

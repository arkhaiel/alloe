export default defineAppConfig({
    head: {
        viewport:  'width=device-width, initial-scale=1',
        title: "alloé: allez, on écrit !",
        noscript: [
        { children: 'JavaScript is required' }
        ]
    },      
    ui: {
        textarea: {
            size: {
                txs: 'text-xs',
                tsm: 'text-sm',
                tmd: 'text-md',
                tlg: 'text-lg',
                txl: 'text-xl',
                t2xl: 'text-2xl',
                t3xl: 'text-3xl',
                t4xl: 'text-4xl',
                t5xl: 'text-5xl',
            }
        },
        input: {
            size: {
                txs: 'text-xs',
                tsm: 'text-sm',
                tmd: 'text-md',
                tlg: 'text-lg',
                txl: 'text-xl',
                t2xl: 'text-2xl',
                t3xl: 'text-3xl',
                t4xl: 'text-4xl',
                t5xl: 'text-5xl',
            }
        }
    }
})

export default defineNuxtPlugin(async (nuxtApp) => {
    const us = useCounterStore()

    if (us.user) {
        await us.getUserData()
    }
})

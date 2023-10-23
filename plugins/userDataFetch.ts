
export default defineNuxtPlugin(async (nuxtApp) => {
    const user = useSupabaseUser()
    const appConfig = useAppConfig();
    const us = useCounterStore()

    if (user.value) {
        console.log('ON A UN USER');
        us.userData = await useUserData()
        appConfig.ui.primary = us.userData.prefColor
        us.count += 10
    }
    else {
        console.log('ON A PAS !!');
        us.count -= 10
    }
})

import type { Database } from '~/database.types'


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const waitCode = ref(false)
  const user: any = useSupabaseUser()
  const supabase = useSupabaseClient<Database>()
  const userData = ref()

  function logUser() {
    console.log(user.id);
  }

  async function getUserData() {
    userData.value = await useUserData()
  }
  async function saveUserData() {
    userData.value = await useSaveUserData()
  }

  return { count, user, waitCode, userData, supabase, logUser, getUserData, saveUserData }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
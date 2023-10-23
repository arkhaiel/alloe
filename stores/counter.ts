import type { Database } from '~/database.types'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const waitCode = ref(false)
  const user = useSupabaseUser()
  const supabase = useSupabaseClient<Database>()
  const userData = ref()

  function logUser() {
    console.log(this.user.id);
  }

  async function getUserData() {
    this.userData = await useUserData()
  }
  async function saveUserData() {
    this.userData = await useSaveUserData()
  }

  return { count, user, waitCode, userData, supabase, logUser, getUserData, saveUserData }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
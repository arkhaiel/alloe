export const useStore = defineStore('store', () => {
  const session = ref()

  function getS() {
    const { loggedIn, user } = useUserSession()
    if (loggedIn.value) {
      session.value = user.value
    } else {
      session.value = false
    }
  }

  async function clearS() {
    await useUserSession().clear()
    session.value = false
  }
  
    return { session, getS, clearS }
  })
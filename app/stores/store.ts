export const useStore = defineStore('store', () => {
    const session = useUserSession()
  
    return { session }
  })
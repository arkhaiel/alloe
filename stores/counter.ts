
export const useCounterStore = defineStore('counter', () => {

  const count = ref(0)
  const user = useSupabaseUser()

  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, user, doubleCount, increment }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
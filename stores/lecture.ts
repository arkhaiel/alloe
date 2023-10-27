export const useReadingStore = defineStore('lecture', () => {
  const roots = ref()
  const data = ref()
  const story = ref()
  const enfants = ref()
  const current = ref()

  async function getRoots() {
    roots.value = await useGetRoots()
  }

  async function newReading(id_chap: string) {
    return await useNewReading(id_chap)
  }
  return { roots, data, story, enfants, current, getRoots, newReading }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReadingStore, import.meta.hot))
}
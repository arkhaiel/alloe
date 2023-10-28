export const useReadingStore = defineStore('lecture', () => {
  const data = ref()
  const roots = ref()
  const reading = ref()
  const readings = ref()
  const story = ref()
  const storyList = ref()
  const enfants = ref()
  const current = ref()
  const isStory = ref(false)

  const quotaReading = computed(() => {
    if(reading.value) {
      return {
        max: roots.value.find(el => el.root.id === reading.value.root_chap).root.constrains.max_chaps,
        current: reading.value.size
      }
    } else return null
  })
  

  async function getRoots() {
    roots.value = await useGetRoots()
  }

  async function getReadings() {
    readings.value = await useGetReadings()
  }

  async function newReading(id_chap: string, id_root: string) {
    return await useNewReading(id_chap, id_root)
  }
  return { roots, quotaReading, data, reading, readings, story, storyList, enfants, current, isStory, getRoots, getReadings, newReading }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReadingStore, import.meta.hot))
}
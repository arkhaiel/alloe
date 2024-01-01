import type { Database } from '~/database.types'

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
  const users = ref()
  const sb = useSupabaseClient<Database>()

  const quotaReading = computed(() => {
    if(reading.value) {
      return {
        max: roots.value.find(el => el.root.id === reading.value.root_chap).root.constrains.max_chaps,
        current: reading.value.size
      }
    } else return null
  })
  

  async function getRoots() {
    if(!roots.value) roots.value = await useGetRoots()
  }

  async function getUsers() {
    users.value = await useGetUsers()
  }

  async function getReadings() {
    readings.value = await useGetReadings()
  }

  async function newReading(id_chap: string, root: any) {    
    return await useNewReading(id_chap, root)
  }
  return { roots, users, quotaReading, data, reading, readings, story, storyList, enfants, current, isStory, sb, getUsers, getRoots, getReadings, newReading }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReadingStore, import.meta.hot))
}
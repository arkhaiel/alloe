<template>
  <UCard class="mb-48" :ui="{ body: { padding: 'py-0 sm:py-0' }}" >
  <template #footer v-if="read.current">
  <a id="suitemenu" />
  <SuiteMenu v-if="read.quotaReading && (read.quotaReading.current < read.quotaReading.max)" />
  <UCard v-else-if="read.quotaReading && (read.quotaReading.current === read.quotaReading.max)">
  <div class="flex justify-center"><Logo /></div>
  Cette histoire est terminée ! Vous pouvez en créer une autre en retournant sur la page <UButton label="lire" variant="soft" to="/lire" />, avec le même challoé ou avec un autre, pour découvrir d'autres histoires !
  </UCard>
  </template>
  <template #header>
  <UInput v-if="!loading" v-model="read.reading.title" @keyup.enter="updateTitle()" />
  </template>
  <div v-if="!loading">
      <article class="prose dark:prose-invert whitespace-pre-wrap text-justify prose-p:indent-4 min-w-full pt-0">
      <TransitionGroup name="list">
      <div v-for="(ch, index) of story" :key="index" class="relative pt-0 prose-p:last:mb-0">
      <a :id="`chapitre${index}`" class="absolute -top-[calc(var(--header-height))]" />
<UDivider v-if="index !== 0" /><MdComp>{{ ch.text.replaceAll('\n', '\n\n') }}</MdComp>
        <div class="absolute bottom-0 right-0 text-gray-500 dark:text-gray-400 italic">{{ ch.author }}</div>
      </div>
      </TransitionGroup>
      </article>
  </div>
  <div v-else>Chargement...</div>
  </UCard>
  <div class="fixed bottom-2 left-0 flex flex-row justify-center w-screen">
  <UDropdown :items="chapsNav">
  <UBadge size="lg" v-if="read.quotaReading">{{ read.quotaReading.current }} / {{ read.quotaReading.max }}</UBadge>
  </UDropdown>
</div>
</template>

<script lang="ts" setup>
// TODO simplifier cette page pour obtenir simplement l'obtention d'une histoire depuis l'ID : fusionner avec l'index ?
definePageMeta({
  middleware: [function(to, from) {
    const read = useReadingStore();
    if(from.path === '/lire') read.isStory = false
    else read.isStory = true
  }]
})
import type { Database } from '~/database.types'
const read = useReadingStore();
await read.getUsers()
await read.getReadings()
await read.getRoots()
const loading = ref(true);
const params = useRoute().params; //params.id est l'ID d'une LECTURE
read.reading = read.readings.find(el => el.id === params.id)
read.current = read.roots.find(el => el.root.id === read.reading.root_chap)
const { story } = storeToRefs(read)
await getFullReading()

const updateTitle = async () => {
  const supabase = useSupabaseClient<Database>()
  const toast = useToast()
  try {
    const {data: reading, error: e1} = await supabase.from('readings').upsert(read.reading).select()
    if(e1) throw e1
    toast.add({ title: "Le titre est modifié !"})
  } catch (error) {
    console.error(error);    
  }
}

read.enfants = await useGetChaps(read.enfants)
loading.value = false

const chapsNav = computed(() => {
  return story.value.map((el, index) => {
    return [{
      label: `chapitre ${index}`,
      to: `#chapitre${index}`
    }]
  }).concat([[{
    label: 'suites', 
    to: '#suitemenu'
  }]])
})
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
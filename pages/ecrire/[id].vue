<template>
  <div class="mx-auto max-w-5xl prose dark:prose-invert">
    <UDivider class="my-4" :ui="{ container: { horizontal: 'items-center flex-row' }}">
      <UIcon name="i-heroicons-arrow-down" />
      Chapitres précédents
      <UIcon name="i-heroicons-arrow-down" />
    </UDivider>
    <UAccordion :items="fullStory" multiple>
    <template #item="{ item }">
      <div class="prose dark:prose-invert whitespace-pre-wrap max-w-none text-justify">
      <MDC :value="item.content" />
    </div>
    </template>
    </UAccordion>
    <UDivider class="my-4" :ui="{ container: { horizontal: 'items-center flex-row' }}">
      <UIcon name="i-heroicons-arrow-down" />
      Votre chapitre
      <UIcon name="i-heroicons-arrow-down" />
    </UDivider>
    <Editor :data="text" @update:data="newValue => text = newValue" :max-chars="rootConstrains.max_len" />
    <div v-if="enfants2.length > 0">
      <UDivider class="my-4" :ui="{ container: { horizontal: 'items-center flex-row' }}">
        <UIcon name="i-heroicons-arrow-down" />
        Suites
        <UIcon name="i-heroicons-arrow-down" />
      </UDivider>
      <UAccordion :items="enfants2" multiple>
      <template #item="{ item }">
      <div class="prose dark:prose-invert whitespace-pre-wrap max-w-none text-justify">
        <MDC :value="item.content" />
      </div>
      </template>
      </UAccordion>
    </div>
  </div>
</template>

<script lang="ts" setup>
const params = useRoute().params
const text = ref()
const read = useReadingStore()
read.getRoots()

const story = await useGetStory(params.id)

const enfants = story.filter((el: any) => el.parent === params.id).map((el: any) => el.enfant)

const storyList = [params.id]
while(findParent(story, storyList[0]))
  storyList.unshift(findParent(story, storyList[0]))
storyList.pop()
  
const data = (await useGetChaps(storyList.concat(enfants))).map((el, index) => {
  return {
    id: el.id,
    content: el.text,
    slot: 'item'
  }
})

const fullStory = storyList.map((elid, index) => {
  return {
    label: `Chapitre ${index}`,
    ...data.find(el => el.id === elid)
  }
})
const enfants2 = enfants.map((elid, index) => {
  return {
    label: `Suite ${index}`,
    ...data.find(el => el.id === elid)
  }
})

text.value = (await useGetChaps([params.id.toString()]))[0].text
const rootConstrains = computed(() => (read.roots.find(el => el.root.chapter === fullStory[0]?.id)?.root.constrains) ?? { max_len: 9999 })

</script>

<style>

</style>


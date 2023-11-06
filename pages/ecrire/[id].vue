<template>
  <div class="mx-auto max-w-5xl prose dark:prose-invert">
    <Callout>TODO : gérer le dernier chapitre de l'accordéon, ainsi que l'existence d'enfants</Callout>
    <h2>Chapitres précédents</h2>
    <UAccordion :items="fullStory" multiple>
    <template #item="{ item }">
    <div prose class="whitespace-pre-wrap">
      <MDC :value="item.content" />
    </div>
    </template>
    </UAccordion>
    <UDivider class="my-4" :ui="{ container: { horizontal: 'items-center flex-row' }}">
      <UIcon name="i-heroicons-arrow-down" />
      Votre chapitre
      <UIcon name="i-heroicons-arrow-down" />
    </UDivider>
    <Editor :data="text" @update:data="newValue => text = newValue" />
  </div>
</template>

<script lang="ts" setup>
const params = useRoute().params
const text = ref()
const read = useReadingStore()
console.log(params.id);

const story = await useGetStory(params.id)

const enfants = story.filter((el: any) => el.parent === params.id).map((el: any) => el.enfant)

const storyList = [params.id]
while(findParent(story, storyList[0]))
  storyList.unshift(findParent(story, storyList[0]))
  
const fullStory = (await useGetChaps(storyList)).map((el, index) => {
  return {
    label: `chap ${index}`,
    content: el.text,
    slot: 'item'
  }
})

text.value = (await useGetChaps([params.id.toString()]))[0].text
</script>

<style>

</style>


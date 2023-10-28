<template>
  <div v-if="!loading">
      <article class="prose dark:prose-invert whitespace-pre-wrap text-justify prose-p:indent-4 min-w-full">
      <TransitionGroup name="list">
      <div v-for="(ch, index) of read.storyList.slice(1)" :key="index">
        <MdComp>{{ '\n\n---\n\n'+ch.text }}</MdComp>
      </div>
      </TransitionGroup>
      </article>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [function(to, from) {
    const read = useReadingStore();
    if(from.path === '/lire') read.isStory = false
    else read.isStory = true
  }]
})
const read = useReadingStore();
const loading = ref(true);
const params = useRoute().params; //params.id est l'ID d'une LECTURE

if(read.isStory) await getFullReading(read.readings.find(el => el.id === params.id).last_chap)
if(!read.storyList) navigateTo('/lire')
read.current = read.roots.find(el => el.root.chapter === read.storyListList[0])

loading.value = false
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
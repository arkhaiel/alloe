<template>
  <div v-if="!loading">
    <UCard>
      <article class="prose dark:prose-invert whitespace-pre-wrap text-justify prose-p:indent-4 min-w-full">
      <TransitionGroup name="list">
      <div v-for="(ch, index) of read.story.slice(1)" :key="index">
        <MdComp>{{ (index === 0) ? ch.text : '\n\n---\n\n'+ch.text }}</MdComp>
      </div>
      </TransitionGroup>
      </article>
    </UCard>
    <UButton v-for="(en, idx) of read.enfants" :key="idx" @click="prevnextChap(en, params.id.toString())" :label="'enfant '+idx.toString()" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [function(to, from) {
    // if(from)
    console.log(from)
  }]
})
const read = useReadingStore();
const loading = ref(true);
const params = useRoute().params; //params.id est l'ID d'une LECTURE

if(!read.story) navigateTo('/lire')

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
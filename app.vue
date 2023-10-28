<script setup>
import { useRuntimeConfig } from "#app";
import { useContent, useContentHead, useRequestEvent } from "#imports";

const { contentHead } = useRuntimeConfig().public.content;
const { page, layout } = useContent();
const us = useCounterStore()
if(us.user) await us.getUserData

useHead({
  htmlAttrs: {
    lang: "fr",
  },
});
watch(page, () => {
  if (contentHead && page.value) useContentHead(page);
  else useHead({ title: "alloé : allez, on écrit !" });
});

const dispTuto = computed(() => {
  if(useRoute().path === '/') return true
  if(us.user && us.userData) return us.userData.tuto
})
</script>

<template>
  <div>
    <UContainer class="min-h-[90vh]">
    <LayoutHeader />
    <Tuto :tutopage="useRoute().path" v-if="dispTuto" />
      <NuxtPage />
    </UContainer>
    <LayoutFooter />
    <UNotifications />
  </div>
</template>

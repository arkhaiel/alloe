<script setup>
import { useRuntimeConfig } from "#app";
import { useContent, useContentHead, useRequestEvent } from "#imports";

const { contentHead } = useRuntimeConfig().public.content;
const { page, layout } = useContent();

useHead({
  htmlAttrs: {
    lang: "fr",
  },
});
watch(page, () => {
  if (contentHead && page.value) useContentHead(page);
  else useHead({ title: "alloé : allez, on écrit !" });
});
</script>

<template>
  <Header />
  <NuxtPage />
  <Footer />
  <UNotifications />
</template>

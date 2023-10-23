<script setup>
import { useRuntimeConfig } from "#app";
import { useContent, useContentHead, useRequestEvent } from "#imports";

const { contentHead } = useRuntimeConfig().public.content;
const { page, layout } = useContent();

watch(page, () => {
  if (contentHead && page.value) useContentHead(page);
  else useHead({ title: "alloé : allez, on écrit !" });
});
</script>

<template>
  <Header />
  <NuxtPage class="min-h-[80vh]" />
  <Footer />
  <UNotifications />
</template>

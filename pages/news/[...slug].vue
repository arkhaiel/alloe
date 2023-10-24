<template>
  <UCard
    class="m-auto p-4 sm:p-0 lg:max-w-4xl prose dark:prose-invert prose-h1:prose-2xl prose-h2:prose-xl prose-a:no-underline"
  >
    <ContentRenderer :key="page._id" :value="page">
      <h1 class="mb-0">{{ page.title }}</h1>
      {{ useDateFormat(page.date, "DD-MM-YYYY").value }}
      <ContentRendererMarkdown :value="page" />
    </ContentRenderer>
  </UCard>
</template>

<script setup>
import { useRuntimeConfig } from "#app";
import { useContent, useContentHead, useRequestEvent } from "#imports";

const { contentHead } = useRuntimeConfig().public.content;
const { page, layout } = useContent();

if (!page.value && process.server) {
  const event = useRequestEvent();
  event.node.res.statusCode = 404;
}
</script>

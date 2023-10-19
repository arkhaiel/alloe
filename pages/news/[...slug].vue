<template>
    <article class="m-auto p-4 sm:p-0 lg:max-w-5xl prose dark:prose-invert">
        <ContentRenderer :key="(page as any)._id" :value="page">
        <h1 class="mb-0">{{ page.title }}</h1>
        {{ useDateFormat(page.date, 'DD-MM-YYYY').value }}
        <ContentRendererMarkdown :value="page" />
        </ContentRenderer>
    </article>
</template>

<script setup>
import { useRuntimeConfig } from '#app'
import { useContent, useContentHead, useRequestEvent } from '#imports'

const { contentHead } = useRuntimeConfig().public.content
const { page, layout } = useContent()

if (!(page as any).value && process.server) {
  const event = useRequestEvent()
  event.res.statusCode = 404
}

if (contentHead) {
  useContentHead(page)
}
</script>

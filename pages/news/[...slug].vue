<template>
    <article class="m-auto p-4 sm:p-0 lg:max-w-5xl prose dark:prose-invert">
        <ContentRenderer :value="data">
        <h1 class="mb-0">{{ data.title }}</h1>
        {{ useDateFormat(data.date, 'DD-MM-YYYY').value }}
        <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
    </article>
</template>

<script setup>
const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>

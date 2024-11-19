<script setup>
import { createId } from '@paralleldrive/cuid2'

const test = createId()
const chap = ref('blabla')

const sendChap = async () => {
  const res = await $fetch('/api/chapters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: chap.value,
  })
  console.log(res)
}
</script>

<template>
  <article class="prose dark:prose-invert">
    <h1>alloé</h1>
    <Login />
    <EditorTiptap v-model="chap" :json="true" />
    <p>{{ chap }}</p>
    <Button @click="sendChap">
      Send
    </Button>
  </article>
</template>

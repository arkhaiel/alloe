<template>
  <MDC :value="def[0].children" />
</template>

<script setup>
import { useSlots, useAttrs } from 'vue'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const slots = useSlots()
const def = slots.default()

</script>

<style>
.prose a {
  text-decoration: none;
}
</style>


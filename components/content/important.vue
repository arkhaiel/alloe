<template>
  <UCard :ui="ui"><slot /></UCard>
</template>

<script lang="ts" setup>
const ui = {
  "base": "overflow-hidden",
  "background": "bg-emerald-100 dark:bg-emerald-900",
  "divide": "divide-y divide-gray-200 dark:divide-gray-800",
  "ring": "ring-1 ring-emerald-400 dark:ring-emerald-600",
  "rounded": "rounded-lg",
  "shadow": "shadow",
  "body": {
    "base": "",
    "background": "",
    "padding": "px-4 py-5 sm:p-2"
  },
  "header": {
    "base": "",
    "background": "",
    "padding": "px-4 py-5 sm:px-6"
  },
  "footer": {
    "base": "",
    "background": "",
    "padding": "px-4 py-4 sm:px-6"
  }
}

</script>

<style>

</style>


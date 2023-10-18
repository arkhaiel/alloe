<template>
  <ULink to="/"><img class="h-16" :src="isDark ? '/logo-dark.svg' : '/logo-light.svg'" /></ULink>
</template>

<script setup>
const props = defineProps(['isDark'])
</script>



<style>

</style>

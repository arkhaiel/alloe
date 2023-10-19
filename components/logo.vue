<template>
  <ULink to="/">
  <img v-show="isDark === false" class="h-16" src="/logo-light.svg" />
  <img v-show="isDark === true" class="h-16" src="/logo-dark.svg" />
  </ULink>
</template>

<script setup>
const props = defineProps(['isDark'])
</script>



<style>

</style>

<template>
  <ClientOnly>
    <UButton
      label="mode"
      @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>

</script>

<style>

</style>

<template>
  <div>
    {{ route }}
  </div>
</template>

<script lang="ts" setup>
const route = ref();

setTimeout(() => {
  route.value = useRoute();
}, 1000);
</script>

<template>
  <div>
    {{ route }}
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
console.log(route);
</script>

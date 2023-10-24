<template>
  <div>
    <h1>coucou</h1>
    {{ route }}
  </div>
</template>

<script lang="ts" setup>
const route = ref();
onMounted(() => {
  route.value = useRoute();
});
</script>

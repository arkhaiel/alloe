<template>
  <div>
    {{ route }}
  </div>
</template>

<script lang="ts" setup>
const route = ref();
onMounted(() => {
  route.value = useRoute();
});
</script>

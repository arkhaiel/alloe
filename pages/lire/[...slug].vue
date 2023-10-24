<template>
  <div>
    {{ route }}
  </div>
</template>

<script lang="ts" setup>
const route = useRouter();
console.log(route);
</script>

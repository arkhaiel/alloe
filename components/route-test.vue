<template>
  <div>
    <p>route</p>
    {{ route }}
    <p>route params</p>
    {{ route.params }}
    <p>router</p>
    {{ router }}
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
</script>

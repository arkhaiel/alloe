<template>
  <div>
    {{ route }}
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route);
</script>

<style></style>

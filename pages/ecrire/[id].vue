<template>
  <div>
    <Editor :data="text" @update:data="newValue => text = newValue" />
  </div>
</template>

<script lang="ts" setup>
const params = useRoute().params
const text = ref()
const read = useReadingStore()

text.value = (await useGetChaps([params.id.toString()]))[0].text
</script>

<style>

</style>


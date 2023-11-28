<template>
  <div  v-for="log of logs">
  <div class="grid grid-cols-6">
    <div class="sm:col-span-2 col-span-2 p-6 sm:p-8 md:p-10">
    <div class="sticky top-[calc(var(--header-height)+1rem)] flex flex-col items-start">
    <UBadge  :label="`v.${log.version}`" />
    <span>{{ log.date }}</span>
    </div>
    </div>
    <div class="prose dark:prose-invert min-w-0 max-w-none sm:col-span-4 col-span-4">
<ContentDoc :path="log._path" />
    </div>
  </div>
  <UDivider />
</div>
</template>

<script lang="ts" setup>
const { navigation } = useContent();
const logs = navigation.value.find(el => el._path === '/logs').children
</script>

<style>

</style>


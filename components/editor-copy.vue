<template>
  <UContainer class="mx-auto max-w-3xl">
    <UTextarea class="font-mono" ref="editor" id="editor" v-model="text" autoresize />

    <UButton class="mt-2" label="Enregistrer" @click="" />
  </UContainer>
</template>

<script lang="ts" setup>
const props = defineProps(["data"]);
const text = ref(props.data);
const emit = defineEmits(["update:data"]);
watch(text, () => {
  emit("update:data", text.value);
});
//f
</script>

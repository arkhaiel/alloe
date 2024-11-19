<template>
  <ClientOnly>
    <EditorContent :editor="editor" class="leading-4" />
  </ClientOnly>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = ref(null)
const val = defineModel({ type: [String, Object], required: true })
const emit = defineEmits(['update:modelValue'])
const { json: isJSON } = defineProps({ json: { type: Boolean, default: false } })
onMounted(() => {
  editor.value = new Editor({
    content: val.value,
    extensions: [StarterKit],
    onUpdate: () => {
      if (isJSON) {
        emit('update:modelValue', editor.value.getJSON())
      }
      else {
        emit('update:modelValue', editor.value.getHTML())
      }
    },
  })

  watchEffect(() => {
    const isSame = isJSON ? JSON.stringify(editor.value.getJSON()) === JSON.stringify(val.value) : editor.value.getHTML() === val.value

    if (isSame) return

    editor.value.commands.setContent(val.value)
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style scoped>

</style>

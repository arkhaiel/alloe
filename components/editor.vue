<template>
  <div class="mx-auto">
    <div class="flex flex-row justify-between mb-2">
      <UButtonGroup>
        <UButton class="p-2" variant="outline" @click="fsize++" icon="i-heroicons-plus" :disabled="fsize >= fsizee.length - 1" />
        <UButton class="p-2" variant="outline" @click="fsize--" icon="i-heroicons-minus" :disabled="fsize <= 0" />
      </UButtonGroup>
      <UButtonGroup>
      <UBadge variant="solid" :color="maxReached ? 'red' : 'primary'" :label="text.length" />
      <UBadge variant="solid" :color="maxReached ? 'red' : 'primary'" label="/" />
      <UBadge variant="solid" :color="maxReached ? 'red' : 'primary'" :label="maxChars" />
      </UButtonGroup>
      <UButtonGroup>
        <UBadge
          :color="isDial ? 'primary' : 'red'"
          label="dialogue"
          variant="subtle"
        />
        <UBadge variant="subtle" :color="isDial ? 'primary' : 'red'" :label="isDial ? 'ON' : 'OFF'" />
      </UButtonGroup>
    </div>
    <UTextarea
      class="font-mono"
      :size="'t' + fsizee[fsize]"
      ref="editor"
      id="editor"
      :rows="30"
      v-model="text"
      @keyup.enter="newline"
      @keypress="stopinput"
      resize
    />

    <div class="text-center" v-if="maxReached"><span class="text-red-500 font-semibold">La limite de caractères définie pour ce challoé est atteinte !</span></div>
    <div class="flex justify-center items-center"><UButton class="mt-2" label="Enregistrer" @click="useUpdateChap(text, chid)" /></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["data", "maxChars"]);
const emit = defineEmits(["update:data"]);
const chid = useRoute().params.id
const fsize = ref(1);

const text = ref(props.data);
const editor = ref<any>();
const textarea: HTMLTextAreaElement | any = ref();
const lines = computed(() => text.value.split("\n"));
const fsizee = ["xs", "sm", "md", "lg", "xl"];

onMounted(() => {
  textarea.value = editor.value.$refs.textarea;
});

const maxReached = computed(() => {
  return text.value.length >= props.maxChars
})

const sstart = ref(); // correspond à SelectionStart
const ssend = ref(); // correspond à SelectionEnd (en général les deux sont égaux quand on tape du texte au clavier)
const isDial = ref(false); // est-ce qu'on est en "mode dialogue ?"

const linesl = computed(() => {
  // return en fait la position du curseur, en ligne et colonne
  const arr = lines.value.map((el: string | any[]) => el.length);
  for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i - 1] + arr[i] + 1;
  }
  if (arr.length > 1) arr[0] = arr[0] + 0;

  const lln = arr.findIndex((el: string | any[]) => el >= sstart.value);
  const ln = lln == -1 ? 0 : lln;
  // console.log(ln);

  return { lineNumber: 1 + ln, col: ln == 0 ? sstart.value : sstart.value - arr[ln - 1] };
});

const newline = () => {
  // en cas d'appui sur la touche "Enter", cette fonction est appelée et gère la conséquence du mode dialogue
  const pos = linesl.value;
  const back = sstart.value;
  console.log(lines.value, pos.lineNumber);

  if (lines.value[pos.lineNumber - 2].match(/^— .+/)) {
    isDial.value = true;

    text.value = text.value.substring(0, back) + "— " + text.value.substring(back);
    setTimeout(() => {
      textarea.value.setSelectionRange(back + 2, back + 2);
    }, 50);
  } else if (lines.value[pos.lineNumber - 2] == "— ") {
    lines.value.splice(pos.lineNumber - 2, 1);
    isDial.value = false;
    text.value = lines.value.join("\n");
    setTimeout(() => {
      textarea.value.setSelectionRange(back - 3, back - 3);
    }, 50);
  }
};

const stopinput = (event) => {
  if(text.value.length >= props.maxChars) event.preventDefault();
}

watch(text, (newVal, oldVal) => {
  // cette fonction est en charge de maintenir le suivi de la position du curseur
  const doc = textarea.value;
  if (doc) {
    sstart.value = doc.selectionStart;
    ssend.value = doc.selectionEnd;
  }

  if(newVal.length > props.maxChars) text.value = oldVal
  
  text.value = text.value.replace("-- ", "— ");
  emit("update:data", text.value);
});
</script>

<style></style>

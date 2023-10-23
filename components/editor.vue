<template>
  <UContainer class="mx-auto max-w-3xl">
    <div class="flex flex-row justify-start mb-2">
      <UButtonGroup>
        <UButton @click="fsize++" label="+" :disabled="fsize >= fsizee.length - 1" />
        <UButton @click="fsize--" label="-" :disabled="fsize <= 0" />
      </UButtonGroup>
      <UButtonGroup>
        <UBadge
          :color="isDial ? 'primary' : 'red'"
          label="Mode dialogue"
          variant="outline"
        />
        <UBadge :color="isDial ? 'primary' : 'red'" :label="isDial ? 'ON' : 'OFF'" />
      </UButtonGroup>
    </div>
    <UTextarea
      class="font-mono"
      :size="'t' + fsizee[fsize]"
      ref="editor"
      id="editor"
      v-model="text"
      @keyup.enter="newline"
      autoresize
    />

    <UButton class="mt-2" label="Enregistrer" @click="" />
  </UContainer>
</template>

<script lang="ts" setup>
const fsize = ref(1);
const text = ref("blablablablablablablablablablablabla");
const editor = ref<any>();
const textarea: HTMLTextAreaElement | any = ref();
const lines = computed(() => text.value.split("\n"));
const fsizee = ["xs", "sm", "md", "lg", "xl"];
// const fsizee = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl']

// const saveChap = () => {
//   const newChap = new newChapter(text.value);
//   newChap.insert();
// };

onMounted(() => {
  textarea.value = editor.value.$refs.textarea;
});

const totlines = computed(() => lines.value.length); // nombre de lignes au total
const sstart = ref(); //c orrespond à SelectionStart
const ssend = ref(); // correspond à SelectionEnd (en général les deux sont égaux quand on tape du texte au clavier)
const isDial = ref(false); // est-ce qu'on est en "mode dialogue ?"

const linesl = computed(() => {
  // return en fait la position du curseur, en ligne et colonne
  const arr = lines.value.map((el) => el.length);
  for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i - 1] + arr[i] + 1;
  }
  if (arr.length > 1) arr[0] = arr[0] + 0;

  const lln = arr.findIndex((el) => el >= sstart.value);
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
    // lines.value[pos.lineNumber -1] = '— ' + lines.value[pos.lineNumber -1]
    isDial.value = true;
    // text.value = lines.value.join('\n')

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

watch(text, () => {
  // cette fonction est en charge de maintenir le suivi de la position du curseur
  const doc = textarea.value;
  if (doc) {
    sstart.value = doc.selectionStart;
    ssend.value = doc.selectionEnd;
  }

  text.value = text.value.replace("-- ", "— ");
});
</script>

<style></style>

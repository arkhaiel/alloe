<template>
  <UButton
    icon="i-heroicons-arrow-up"
    label="Remonter d'un chapitre"
    variant="soft"
    @click="prevChap()"
    v-if="storyList.length > 1"
  />
  <UTabs
    orientation="vertical"
    v-if="items "
    :items="items"
    v-model="selected"
    :key="enfants[0]"
    :ui="{
      wrapper: 'flex items-center gap-0 md:gap-4 h-[12rem] space-y-0',
      list: { width: 'w-48',  },
      container: 'h-full m-0 px-4 overflow-y-scroll self-start',
      base: 'h-full'
    }"
  >
    <template #item="{ item }">
    <div class="flex flex-row justify-end">
      <UButton variant="ghost" :to="'/ecrire/'+item.id" size="xs" v-if="item.author === us.user.id">modifier mon chapitre</UButton>
    </div>
      <div
        class="prose static dark:prose-invert whitespace-pre-wrap pt-0 prose-p:first:m-0 text-[0.92rem]/6 px-0 sm:px-4 text-justify prose-p:indent-4 max-w-none grow"
      ><MdComp>{{ item.content }}</MdComp>
      </div>
    </template>

    <template #vide="{ item }">
      <div class="flex h-full w-full flex-row justify-center items-center">
        <UButton
          size="xl"
          label="Écrire une suite"
          variant="outline"
          @click="newChap(read.storyList[read.storyList.length - 1])"
        />
      </div>
    </template>
  </UTabs>
  <UButton
    v-if="items"
    icon="i-heroicons-arrow-down"
    :loading="working"
    label="Continuer avec cette suite"
    variant="soft"
    @click="addSuite(enfants.find((el) => el.id === items[selected].id))"
    :disabled="items[selected].slot === 'vide'"
  />
</template>

<script lang="ts" setup>
const read = useReadingStore();
const us = useCounterStore()
const selected = ref(0);
const parid = useRoute().params.id;
const working = ref(false)
const items = ref();
const { storyList, enfants } = storeToRefs(read);


watch(enfants, () => {
  items.value = [];
  items.value = makeItems();
  selected.value = 0
});

const makeItems = () => {
  items.value = enfants.value
    ? enfants.value.map((el: any, idx: number) => {
        return { label: `suite ${idx + 1} ${el.author === us.user.id ? '*' : ''}`, content: el.text, id: el.id, author: el.author };
      })
    : [];
  while (items.value.length < read.current?.root.constrains.max_choices)
    items.value.push({ label: "vide", content: "à remplir", slot: "vide" });
  return items.value;
};

items.value = makeItems();

const newChap = async (id_parent: string) => {
  const id_chap = await useCreateBlankChap(id_parent);
  await navigateTo("/ecrire/" + id_chap);
};

const addSuite = async (item: any) => {
  working.value = true
  if (useRoute().path === "/lire") {
    read.reading = await read.newReading(item.id, read.current.root);

    if (read.reading) {
      read.story = [read.current.root];
      await nextChap(
        read.enfants.find((el) => el.id == item.id),
        read.reading.id
      );
      await navigateTo("/lire/" + read.reading.id);
    }
  } else {
    await nextChap(
      read.enfants.find((el) => el.id === item.id),
      parid.toString(),
      true
    );
  }
  working.value = false
};
</script>

<style></style>

<template>
  <div v-if="true">
    <UButton
      class="my-4"
      v-if="read.current"
      icon="i-heroicons-arrow-left"
      label="Retour"
      @click="goback"
      variant="outline"
    />
    <div v-if="read.story === undefined || read.story.length === 0"
      class="grid"
      :key="read.current ? read.current : 'grid'"
      :class="read.current ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 gap-4'"
    >
      <UCard
        v-for="r of read.current?read.roots.filter((el: any) => el.root.id === read.current.root.id) : read.roots"
        :key="r.root.id"
        :ui="{ body: { padding: 'py-0 sm:py-0' } }"
        :class="read.current ? '' : 'cursor-pointer hover:bg-primary-50/50 dark:hover:bg-primary-900/50'"
        @click="lecture(r)"
      >
        <template #header>
          <div class="flex flex-row justify-between">
            <div>{{ r.root.title }}</div>
            <div class="flex flex-row gap-1">
              <UPopover mode="hover">
                <UBadge size="lg" color="green" variant="subtle" class="cursor-help"
                  ><UIcon name="i-heroicons-arrow-down" />{{
                    r.root.constrains.max_chaps
                  }}</UBadge
                >
                <template #panel>
                  <UCard>
                    Ce challoé autorise la création de
                    {{ r.root.constrains.max_chaps }} chapitres entre le début et la fin
                    de l'histoire.
                  </UCard>
                </template>
              </UPopover>

              <UPopover mode="hover">
                <UBadge size="lg" color="blue" variant="subtle" class="cursor-help"
                  ><UIcon name="i-heroicons-arrows-right-left" />{{
                    r.root.constrains.max_choices
                  }}</UBadge
                >
                <template #panel>
                  <UCard>
                    Ce challoé autorise la création de
                    {{ r.root.constrains.max_choices }} suites alternatives au maximum
                    pour chaque chapitre.
                  </UCard>
                </template>
              </UPopover>

              <UPopover mode="hover">
                <UBadge size="lg" color="red" variant="subtle" class="cursor-help"
                  ><UIcon name="i-heroicons-document-text" />{{
                    r.root.constrains.max_len == 9999 ? "∞" : r.root.constrains.max_len
                  }}</UBadge
                >
                <template #panel>
                  <UCard>
                    Ce challoé autorise une longueur de chapitre de
                    {{ r.root.constrains.max_len }} caractères au maximum.
                  </UCard>
                </template>
              </UPopover>
            </div>
          </div>
        </template>
        <div
          class="prose dark:prose-invert whitespace-pre-wrap text-justify prose-p:indent-4 min-w-full"
        >
          <MdComp>{{
            read.current ? r.root.text : r.root.text.slice(0, 300) + "..."
          }}</MdComp>
        </div>

        <template #footer v-if="read.current">
          <SuiteMenu />
        </template>
      </UCard>
    </div>
    <div v-else>
        <article class="prose dark:prose-invert whitespace-pre-wrap text-justify prose-p:indent-4 min-w-full pt-0">
        <TransitionGroup name="list">
        <div v-for="(ch, index) of story" :key="index" class="relative pt-0 prose-p:last:mb-0">
        <a :id="`chapitre${index}`" class="absolute -top-[calc(var(--header-height))]" />
  <UDivider v-if="index !== 0" /><MdComp>{{ ch.text.replaceAll('\n', '\n\n') }}</MdComp>
          <div class="absolute bottom-0 right-0 text-gray-500 dark:text-gray-400 italic">{{ read.users[ch.author] }}</div>
        </div>
        </TransitionGroup>
        </article>
          <SuiteMenu />
    </div>
    <UButton
      class="my-4"
      v-if="read.current"
      icon="i-heroicons-arrow-left"
      label="Retour"
      @click="goback"
      variant="outline"
    />
  </div>
</template>

<script lang="ts" setup>
// TODO gros refactor 
// TODO "où suis-je ?" > projet d'une vue graphique de l'histoire
const read = useReadingStore();
await read.getRoots();
await read.getUsers();
await read.getReadings();
const { story } = storeToRefs(read)
read.current = null;

// if(useRoute().params.id) read.current = read.storyList[0].id

const lecture = (r: any) => {
  if (!read.current) {
    read.storyList = [r.root.chapter];
    read.enfants = r.enfants;
    read.current = r;
  }
  // await navigateTo('/lire/'+id)
};

const goback = () => {
  read.storyList = [];
  read.enfants = [];
  read.current = null;
  read.story = [];
};

const new_reading = async (child: any, root: string) => {
  read.reading = await read.newReading(child.id, root);

  if (read.reading) {
    await nextChap(child, read.reading.id);
    await navigateTo("/lire/" + read.reading.id);
  }
};
</script>

<template>
  <div>
    <UContainer class="grid grid-cols1">
      <div v-for="r of read.readings">
        <div class="flex flex-row gap-4 my-2 hover:bg-primary-50 rounded-lg cursor-pointer" @click="navToReading(r.id)">
          <div class="flex flex-row gap-2">
            <UPopover mode="hover">
              <UBadge size="lg" color="green" variant="subtle" class="cursor-help"
                ><UIcon name="i-heroicons-arrow-down" />{{
                  read.roots.find((el) => el.root.id === r.root_chap).root.constrains
                    .max_chaps
                }}</UBadge
              >
              <template #panel>
                <UCard>
                  Ce challoé autorise la création de
                  {{
                    read.roots.find((el) => el.root.id === r.root_chap).root.constrains
                      .max_chaps
                  }}
                  chapitres entre le début et la fin de l'histoire.
                </UCard>
              </template>
            </UPopover>

            <UPopover mode="hover">
              <UBadge size="lg" color="blue" variant="subtle" class="cursor-help"
                ><UIcon name="i-heroicons-arrows-right-left" />{{
                  read.roots.find((el) => el.root.id === r.root_chap).root.constrains
                    .max_choices
                }}</UBadge
              >
              <template #panel>
                <UCard>
                  Ce challoé autorise la création de
                  {{
                    read.roots.find((el) => el.root.id === r.root_chap).root.constrains
                      .max_choices
                  }}
                  suites alternatives au maximum pour chaque chapitre.
                </UCard>
              </template>
            </UPopover>

            <UPopover mode="hover">
              <UBadge size="lg" color="red" variant="subtle" class="cursor-help"
                ><UIcon name="i-heroicons-document-text" />{{
                  read.roots.find((el) => el.root.id === r.root_chap).root.constrains
                    .max_len == 9999
                    ? "∞"
                    : read.roots.find((el) => el.root.id === r.root_chap).root.constrains
                        .max_len
                }}</UBadge
              >
              <template #panel>
                <UCard>
                  Ce challoé autorise une longueur de chapitre de
                  {{
                    read.roots.find((el) => el.root.id === r.root_chap).root.constrains
                      .max_len
                  }}
                  caractères au maximum.
                </UCard>
              </template>
            </UPopover>
          </div>
          <div class="grow">{{ read.roots.find((el) => el.root.id === r.root_chap).root.title }}</div>
        </div>
      </div>
    </UContainer>

    <UDivider class="my-8">
      <Logo />
    </UDivider>

    <UContainer class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard
        class="text-justify cursor-pointer hover:bg-primary-50"
        v-for="c of chaps"
        @click="navToWriting(c.id)"
      >
        <div
          class="prose dark:prose-invert whitespace-pre-wrap overflow-clip prose-p:first:mt-0 prose-p:text-ellipsis px-0 text-justify prose-p:indent-4"
        >
          <MdComp>{{ c.text ? c.text.slice(0, 200) : "vide" }}</MdComp>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import type { Database } from "~/database.types";
const read = useReadingStore();
const supabase = useSupabaseClient<Database>();
await read.getReadings();
await read.getRoots();

const chaps = await useUserChaps();

const navToWriting = async (id) => {
  await navigateTo("/ecrire/" + id);
};

const navToReading = async (id) => {
  await navigateTo("/lire/" + id);
};
</script>

<style></style>

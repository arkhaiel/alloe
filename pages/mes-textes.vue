<template>
  <div>
    <UTabs :items="tabs" :default-index="tab" @change="async (index) => await navigateTo(`${useRoute().path}?p=${index}`)">
      <template #stories>
        <UContainer>
          <div v-if="read.readings.length > 0">
            <div v-for="r of read.readings">
              <div
                class="flex flex-row flex-wrap justify-between items-center gap-1 sm:gap-4 my-4 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg cursor-pointer"
                @click="navToReading(r.id)"
              >
                <div class="flex flex-row gap-2 items-center">
                  <UPopover mode="hover">
                    <UBadge size="lg" color="green" variant="subtle" class="cursor-help"
                      ><UIcon name="i-heroicons-arrow-down" />
                      <span class="w-4 text-center">{{
                        read.roots.find((el) => el.root.id === r.root_chap).root
                          .constrains.max_chaps
                      }}</span></UBadge
                    >
                    <template #panel>
                      <UCard>
                        Ce challoé autorise la création de
                        {{
                          read.roots.find((el) => el.root.id === r.root_chap).root
                            .constrains.max_chaps
                        }}
                        chapitres entre le début et la fin de l'histoire.
                      </UCard>
                    </template>
                  </UPopover>

                  <UPopover mode="hover">
                    <UBadge size="lg" color="blue" variant="subtle" class="cursor-help"
                      ><UIcon name="i-heroicons-arrows-right-left" /><span
                        class="w-4 text-center"
                        >{{
                          read.roots.find((el) => el.root.id === r.root_chap).root
                            .constrains.max_choices
                        }}</span
                      ></UBadge
                    >
                    <template #panel>
                      <UCard>
                        Ce challoé autorise la création de
                        {{
                          read.roots.find((el) => el.root.id === r.root_chap).root
                            .constrains.max_choices
                        }}
                        suites alternatives au maximum pour chaque chapitre.
                      </UCard>
                    </template>
                  </UPopover>

                  <UPopover mode="hover">
                    <UBadge size="lg" color="red" variant="subtle" class="cursor-help"
                      ><UIcon name="i-heroicons-document-text" /><span
                        class="w-4 text-center"
                        >{{
                          read.roots.find((el) => el.root.id === r.root_chap).root
                            .constrains.max_len == 9999
                            ? "∞"
                            : read.roots.find((el) => el.root.id === r.root_chap).root
                                .constrains.max_len
                        }}</span
                      ></UBadge
                    >
                    <template #panel>
                      <UCard>
                        Ce challoé autorise une longueur de chapitre de
                        {{
                          read.roots.find((el) => el.root.id === r.root_chap).root
                            .constrains.max_len
                        }}
                        caractères au maximum.
                      </UCard>
                    </template>
                  </UPopover>
                </div>
                <div
                  class="grow align-center order-last sm:order-none min-w-full sm:min-w-0"
                >
                  {{ r.title }}
                </div>
                <UButton
                  class="sm:order-last"
                  color="red"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  @click.stop="delReading(r.id)"
                />
              </div>
            </div>
          </div>
          <UCard v-else>
            Vous n'avez aucune lecture enregistrée. Pour créer une nouvelle lecture,
            rendez-vous sur la page <UButton label="lire" to="/lire" variant="soft" />,
            puis choisissez un challoé !
          </UCard>
        </UContainer>
      </template>
      <template #textes>
        <UContainer class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          <p class="col-span-full">
            Les chapitres ci-dessous représentent vos chapitres créés. Si vous les avez
            créés par mégarde, modifiez leur contenu en "à supprimer". Ils seront
            supprimés sous 24h.
          </p>
          <UCard
            class="text-justify cursor-pointer hover:bg-primary-50/50 dark:hover:bg-primary-900/50"
            :ui="{ body: { padding: 'p-2 sm:p-2' } }"
            v-for="c of chaps"
            @click="navToWriting(c.id)"
          >
            <div
              class="prose dark:prose-invert whitespace-pre-wrap overflow-clip prose-p:first:mt-0 prose-p:text-ellipsis px-0 text-justify prose-p:indent-4 text-[0.92rem]/6"
            >
              <MdComp>{{ c.text ? c.text.slice(0, 200) + "..." : "vide" }}</MdComp>
            </div>
          </UCard>
        </UContainer>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
import type { Database } from "~/database.types";
const read = useReadingStore();
const supabase = useSupabaseClient<Database>();
const us = useCounterStore()
await read.getReadings();
await read.getRoots();
const toast = useToast();
const tab = ref(parseInt(useRoute().query.p ?? (us.userData.favPanel - 1)))

const chaps = await useUserChaps();

const tabs = [
  {
    label: "Histoires",
    slot: "stories",
    content: "This is the content shown for Tab1",
  },
  {
    label: "Textes",
    slot: "textes",
    content: "And, this is the content for Tab2",
  }
];

const navToWriting = async (id) => {
  await navigateTo("/ecrire/" + id);
};

const navToReading = async (id) => {
  await navigateTo("/lire/" + id);
};

const delReading = async (id_reading) => {
  try {
    const { data, error } = await supabase.from("readings").delete().eq("id", id_reading);
    await read.getReadings();
    toast.add({ title: "Votre lecture est supprimée" });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style></style>

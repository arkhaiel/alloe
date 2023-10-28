<script setup>
const colorMode = useColorMode();
const us = useCounterStore();
const read = useReadingStore()
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const logout = async () => {
  us.supabase.auth.signOut();
  us.userData = null;
  await navigateTo("/");
};

const items = [
  [
    {
      label: "Profil",
      click: async () => await navigateTo('/profil'),
    },
    {
      label: "Déconnexion",
      click: logout,
    },
  ],
];

const tutoToggle = async() => {
  us.userData.tuto = !us.userData.tuto
  await us.saveUserData()
}
</script>

<template>
  <div
    class="sticky top-0 z-50 w-full backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 mb-8"
  >
    <div class="flex flex-row justify-start content-center items-center gap-2 pr-2">
      <Logo :isDark="isDark" />
      <UButton label="lire" variant="soft" to="/lire" v-if="us.user" />
      <UButton label="mes textes" variant="soft" to="/mes-textes" v-if="us.user" />
      <UBadge v-if="read.quotaReading">{{ read.quotaReading.current }} / {{ read.quotaReading.max }}</UBadge>
    </div>


    <div
      class="flex flex-row justify-end content-center items-center gap-2 pr-2"
    >
    <UButton icon="i-heroicons-lifebuoy" label="tuto" color="gray" @click="tutoToggle" variant="soft" v-if="us.user" />
    <UButton icon="i-heroicons-newspaper" label="news" color="gray" to="/news" variant="soft" />
      <LayoutColorPicker />
      <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="gray"
        variant="soft"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
      <UDropdown :items="items" v-if="us.user && us.userData">
        <UButton
          color="gray"
          :label="us.userData.username ? us.userData.username : 'incomplet'"
        />
      </UDropdown>
      <UButton v-else color="gray" label="Connexion" to="/login" />

    </div>
  </div>
</template>

<style scoped>

.titre {
  font-size: 2rem;
  flex-grow: 1;
}
</style>

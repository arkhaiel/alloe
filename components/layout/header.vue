<script setup>
const colorMode = useColorMode();
const us = useCounterStore();

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
</script>

<template>
  <div
    class="sticky top-0 z-50 w-full backdrop-blur grid grid-cols-3 mb-8"
  >
    <div class="flex flex-row justify-start content-center items-center gap-2 pr-2">
      <Logo :isDark="isDark" />
    </div>
    <div class="flex flex-row justify-center items-center gap-2">
      <UButton label="lire" variant="soft" to="/lire" />
      <UButton label="mes textes" variant="soft" to="/mes-textes" />
    </div>

    <div
      class="flex flex-row justify-end content-center items-center gap-0 sm:gap-2 pr-2"
    >
    <UButton icon="i-heroicons-newspaper" color="gray" to="/news" variant="soft" />
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
    </div>
  </div>
</template>

<style scoped>

.titre {
  font-size: 2rem;
  flex-grow: 1;
}
</style>

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

const tutoToggle = async() => {
  us.userData.tuto = !us.userData.tuto
  await us.saveUserData()
}
</script>

<template>
  <div
    class="sticky top-0 z-50 w-full backdrop-blur-sm flex flex-row flex-wrap justify-between items-center mb-8"
  >
    <div class="">
      <Logo :isDark="isDark" />
    </div>
    <div class="order-3 sm:order-2 min-w-full sm:min-w-0">
      <UButton label="lire" variant="soft" to="/lire" v-if="us.user" />
      <UButton label="mes textes" variant="soft" to="/mes-textes" v-if="us.user" />
    </div>
    <div
      class="flex flex-row order-2 sm:order-3 justify-end content-center items-center gap-2 pr-2"
    >
    <UButton icon="i-heroicons-newspaper" label="news" color="primary" to="/news" variant="soft" />
    <UButton icon="i-heroicons-lifebuoy" :color="us.userData.tuto ? 'primary':'black'" @click="tutoToggle" variant="soft" v-if="us.user" />
      <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="primary"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
      <UDropdown :items="items" v-if="us.user && us.userData">
        <UButton
          color="primary"
          icon="i-heroicons-user"
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

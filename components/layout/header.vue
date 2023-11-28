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



const links = [{
  label: "lire",
  to: "/lire"
}, {
  label: "mes textes",
  to: "/mes-textes"
}, {
  label: "news",
  to: "/news",
  icon: "i-heroicons-newspaper"
}]
</script>

<template>
  <UHeader :links="links" :to="us.user ? '/mes-textes' : '/'">
    <template #logo>
      <Logo :isDark="isDark" />
    </template>
    <template #right>
    <div class="hidden md:flex">
      <UButton icon="i-heroicons-lifebuoy" :color="us.userData.tuto ? 'primary':'black'" @click="tutoToggle" variant="soft" v-if="us.user" />
      <UColorModeButton />
    </div>
      <UDropdown :items="items" v-if="us.user && us.userData">
        <UButton
          color="primary"
          icon="i-heroicons-user"
        />
      </UDropdown>
      <UButton v-else color="gray" label="Connexion" to="/login" />
    </template>
  </UHeader>
</template>

<style scoped>

.titre {
  font-size: 2rem;
  flex-grow: 1;
}
</style>

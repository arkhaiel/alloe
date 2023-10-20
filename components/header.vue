<script setup>
const colorMode = useColorMode()
const userData = useUserData()
const user = useSupabaseUser()
const client = useSupabaseClient()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const items = [
  [{
    label: 'Déconnexion',
    click: () => { client.auth.signOut(); userData.value = null; navigateTo('/') }
  }]
]
</script>

<template>
  <div class="header sticky top-0 z-50 w-full backdrop-blur flex flex-row items-center justify-between mb-8 border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75">
  <Logo :isDark="isDark" />

  <UButton label="news" variant="ghost" to="/news" />

  <div class="flex flex-row justify-between content-center items-center">
  <UDropdown :items="items" v-if="user && userData">
      <UButton color="white" :label="userData.username ? userData.username : 'incomplet'" trailing-icon="i-heroicons-chevron-down-20-solid" />
    </UDropdown>

    <ColorPicker />
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      class="m-2"
      @click="isDark = !isDark"
    />

  </div>
  </div>
</template>

<style scoped>
.header {
  border-bottom: 0px solid lightgray;
}

.titre {
  font-size: 2rem;
  flex-grow: 1;
}
</style>
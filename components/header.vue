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
  <div class="header sticky top-0 z-50 w-full backdrop-blur grid grid-cols-3 mb-8 border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75">
  <div class="flex flex-row justify-start content-center items-center gap-2 pr-2">
  <Logo :isDark="isDark" />
  <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />
  </div>
  <div class="flex flex-row justify-center">
    <UButton label="news" variant="ghost" to="/news" />
  </div>

  <div class="flex flex-row justify-end content-center items-center gap-2 pr-2">
    <ColorPicker />
    <UDropdown :items="items" v-if="user && userData">
      <UButton color="white" :label="userData.username ? userData.username : 'incomplet'" />
    </UDropdown>
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
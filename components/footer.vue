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
  <div class="header w-full flex flex-row items-center justify-around border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75">
    <div class="flex flex-row gap-4">
    <UButton variant="ghost" size="2xs" color="gray" label="Site réalisé par M. NICOLAS" to="mailto:mathieu@alloe.fr" />
    <UButton variant="ghost" size="2xs" color="gray" label="CGU" to="/cgu" />
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
<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const appState = useAppState()

defineShortcuts({
  'E': () => appState.value.accPanel = !appState.value.accPanel
})

</script>

<template>
    <Header />
    <NuxtPage />
    <Footer />
    <UNotifications />
  </template>
<script setup>
// logo animé : https://thecodedose.com/blog/animated-handwriting-effect-with-css/

const user = useSupabaseUser()
const client = useSupabaseClient()
const toast = useToast()
const tabs = [{
  key: 'auth',
  label: 'Se connecter'
}, {
  key: 'insc',
  label: 'Créer un compte'
}]

const infoCook = useCookie('info-ouv', {
  maxAge: 3600*24*2,
  SameSite: 'lax',
  default: () => 'true'
})
</script>

<template>

  <UContainer>
    <div class="w-full max-w-xl m-auto" v-if="user">
      <Welcome />
    </div>

    <div v-else>
    <UAlert :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }" title="Ouverture le 28 Octobre !"
    class="max-w-lg mb-16 mx-auto"
    v-if="infoCook" @close="infoCook = false">
    <template #title="{ title }">
    <Spin class="m-auto" />
    <div class="text-sm font-medium">{{ title }}</div>
    </template>
    <template #description>
    <p>En attendant le grand jour, vous pouvez créer votre compte <UIcon name="i-heroicons-arrow-down" /></p>
    </template>
    </UAlert>
    <UTabs :items="tabs" class="w-full max-w-sm m-auto">
    <template #item="{ item }">
      <Login :mode="item.key" />
    </template>
    </UTabs>
    </div>
  </UContainer>
</template>
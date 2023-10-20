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
</script>

<template>

  <UContainer>
    <div class="w-full max-w-xl m-auto" v-if="user">
      <Welcome />
    </div>

    <UTabs :items="tabs" class="w-full max-w-sm m-auto" v-else>
    <template #item="{ item }">
      <Login :mode="item.key" />
    </template>
    </UTabs>
    
  </UContainer>
</template>
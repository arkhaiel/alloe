<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/confirm':'https://alloe.fr/confirm',
    }
  })
    if (error) throw error
    toast.add({ title: 'Vérifiez votre boîte mail, vous avez du courrier !' })
  } catch (error) {
    toast.add({ title: error.error_description || error.message })
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <UCard>
    <template #header><h2>Authentification</h2></template>
        <UFormGroup label="Recevoir un magic link">
        <UInput type="email" placeholder="Your email" v-model="email" />
        </UFormGroup>

        <div class="flex flex-row justify-around mt-2">
        <UButton @click="handleLogin" :label="loading ? 'Loading' : 'Recevoir un magic link !'"></UButton>
        </div>
  </UCard>
</template>


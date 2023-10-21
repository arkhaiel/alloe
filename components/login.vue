<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const loading = ref(false)
const email = ref('')

const props = defineProps(['mode'])
const cgu = ref(false)
const waitCode = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/confirm':'https://alloe.fr/confirm',
      shouldCreateUser: props.mode === 'auth' ? false : props.mode === 'insc' ? true : false
    }
  })
    if (error) throw error
    toast.add({ title: 'Vérifiez votre boîte mail, vous avez du courrier !' })
    waitCode.value = true
  } catch (error) {
    toast.add({ title: error.error_description || error.message })
  } finally {
    loading.value = false
  }
}

const OTPcode = ref()
watch(OTPcode, (newO, oldO) => {
  if(newO.length > 6) OTPcode.value = oldO
  OTPcode.value = OTPcode.value.replace(/\D/g, '')
}, { flush: 'post' })
const validateOTP = async () => {
  const { data, error } = await supabase.auth.verifyOtp({ email: email.value, token: OTPcode.value, type: 'email'})
  console.log(data);
}
</script>

<template>
    <UCard v-if="!waitCode">
        <UInput type="email" placeholder="Votre adresse mail" v-model="email" />
        <UCheckbox v-model="cgu" class="mt-4 justify-center" v-if="mode === 'insc'">
        <template #label>
          <UButton @click="cgu = !cgu" variant="ghost" color="black" :padded="false">J'ai bien lu et j'accepte les CGU</UButton>
        </template>
        </UCheckbox>
        <div class="flex flex-row justify-around" v-if="mode === 'insc'">
        <UButton variant="ghost" to="/cgu" label="(Pour lire les CGU, c'est par ici)" />
        </div>

        <div class="flex flex-row justify-around mt-4">
        <UButton :disabled="mode === 'insc' && cgu === false" @click="handleLogin" :label="loading ? 'Patientez...' : mode === 'auth' ? 'Se connecter' : mode === 'insc' ? 'Créer un compte' : 'Erreur'"></UButton>
        </div>
  </UCard>
  <UCard v-else>
  <p class="mb-2">Recopier le code reçu :</p>

  <UInput v-model="OTPcode" placeholder="------" size="t5xl" rows="1" :ui="{ base: 'text-center font-mono' }" />
  
  <div class="flex flex-col justify-around mt-4">
    <UButton @click="validateOTP" label="Connexion" />
  </div>
  </UCard>
</template>


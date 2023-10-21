<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const countdown = ref()
const cdInterval = ref()

const startCD = () => {
  countdown.value = 60
  cdInterval.value = setInterval(() => {
    countdown.value -= 1
  }, 1000);
}

watch(countdown, () => {
  if(countdown.value <= 0) {
    clearInterval(cdInterval.value)
    countdown.value = null
  }
})

const loading = ref(false)
const email = ref('')

const props = defineProps(['mode'])
const cgu = ref(false)
const waitCode = useCookie('waitCode', {
  default: () => false,
  maxAge: 3600,
  SameSite: 'lax'
})

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
    waitCode.value = props.mode
    startCD()
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
}

const isMail = computed(() => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
})
</script>

<template>
    <UCard v-if="waitCode != props.mode">
        <UInput type="email" placeholder="Votre adresse mail" v-model="email" :trailing="(!isMail && email) ? true : false">
          <template #trailing>
              <UIcon name="i-heroicons-exclamation-triangle" color="red" v-show="!isMail && email"  />
          </template>
        </UInput>
        <UCheckbox v-model="cgu" class="mt-4 justify-center" v-if="mode === 'insc'">
        <template #label>
          <UButton @click="cgu = !cgu" variant="ghost" color="black" :padded="false">J'ai bien lu et j'accepte les CGU</UButton>
        </template>
        </UCheckbox>
        <div class="flex flex-row justify-around" v-if="mode === 'insc'">
        <UButton variant="ghost" to="/cgu" label="(Pour lire les CGU, c'est par ici)" />
        </div>

        <div class="flex flex-row justify-around mt-4">
        <UButton :disabled="(mode === 'insc' && cgu === false) || countdown != null" @click="handleLogin" :label="countdown ? 'Attendre '+countdown+'s' : loading ? 'Patientez...' : mode === 'auth' ? 'Se connecter' : mode === 'insc' ? 'Créer un compte' : 'Erreur'"></UButton>
        </div>
  </UCard>
  <UCard v-else>
  <p class="mb-2">Recopier le code reçu :</p>

  <UInput v-model="OTPcode" placeholder="------" size="t5xl" rows="1" :ui="{ base: 'text-center font-mono' }" />
  
  <div class="flex flex-col justify-around items-center mt-4">
    <UButton @click="validateOTP" label="Connexion" />
    <UButton size="2xs" variant="ghost" @click="waitCode = false" label="Retour au mail" />
  </div>
  </UCard>
</template>


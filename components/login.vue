<script setup>
const supabase = useSupabaseClient();
const toast = useToast();
const us = useCounterStore();

const loading = ref(false);
const email = ref("");

const props = defineProps(["mode"]);
const cgu = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/confirm"
            : "https://alloe.fr/confirm",
        shouldCreateUser:
          props.mode === "auth" ? false : props.mode === "insc" ? true : false,
      },
    });
    if (error) throw error;
    toast.add({ title: "Vérifiez votre boîte mail, vous avez du courrier !" });
    us.waitCode = props.mode;
  } catch (error) {
    toast.add({ title: error.error_description || error.message });
  } finally {
    loading.value = false;
  }
};

const OTPcode = ref();
watch(
  OTPcode,
  (newO, oldO) => {
    if (newO.length > 6) OTPcode.value = oldO;
    OTPcode.value = OTPcode.value.replace(/\D/g, "");
  },
  { flush: "post" }
);
const validateOTP = async () => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.value,
      token: OTPcode.value,
      type: "email",
    });
    if (error) throw error;
    us.user = data.user;
    us.getUserData();
  } catch (error) {
    console.error(error);
  }
};

const isMail = computed(() => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value);
});
</script>

<template>
  <UCard v-if="us.waitCode != props.mode">
    <UInput
      type="email"
      placeholder="Votre adresse mail"
      v-model="email"
      :trailing="!isMail && email ? true : false"
    >
      <template #trailing>
        <UIcon
          name="i-heroicons-exclamation-triangle"
          color="red"
          v-show="!isMail && email"
        />
      </template>
    </UInput>
    <UCheckbox v-model="cgu" class="mt-4 justify-center" v-if="mode === 'insc'">
      <template #label>
        <UButton @click="cgu = !cgu" variant="ghost" color="black" :padded="false"
          >J'ai bien lu et j'accepte les CGU</UButton
        >
      </template>
    </UCheckbox>
    <div class="flex flex-row justify-around" v-if="mode === 'insc'">
      <UButton variant="ghost" to="/cgu" label="(Pour lire les CGU, c'est par ici)" />
    </div>

    <div class="flex flex-row justify-around mt-4">
      <UButton
        :disabled="mode === 'insc' && cgu === false"
        @click="handleLogin"
        :label="
          loading
            ? 'Patientez...'
            : mode === 'auth'
            ? 'Se connecter'
            : mode === 'insc'
            ? 'Créer un compte'
            : 'Erreur'
        "
      ></UButton>
    </div>
  </UCard>
  <UCard v-else>
    <p class="mb-2">Recopier le code reçu :</p>

    <UInput
      v-model="OTPcode"
      placeholder="------"
      size="t5xl"
      rows="1"
      :ui="{ base: 'text-center font-mono' }"
    />

    <div class="flex flex-col justify-around items-center mt-4">
      <UButton @click="validateOTP" label="Connexion" />
      <UButton
        size="2xs"
        variant="ghost"
        @click="us.waitCode = false"
        label="Retour au mail"
      />
    </div>
  </UCard>
</template>

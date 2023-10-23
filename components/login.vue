<script lang="ts" setup>
const supabase = useSupabaseClient();
const toast = useToast();
const us = useCounterStore();

const loading = ref(false);
const props = defineProps(["mode"]);

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: state.value.email,
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
  } catch (error: any) {
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
      email: state.value.email,
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

import { z } from "zod";
import type { FormErrorEvent, FormSubmitEvent } from "#ui/types";

const login = computed(() => {
  const login = z.object({
    email: z.string().email("adresse mail invalide"),
    cgu: z.boolean(),
  });

  if (props.mode === "auth") return login;
  else if (props.mode === "insc")
    return login.refine((v: any) => v.cgu == true, "les CGU doivent être acceptées");
  else return login;
});

type Schema = z.output<typeof login.value>;

const state = ref({ email: "", cgu: false });

async function submit(event: FormSubmitEvent<Schema>) {
  console.log(event);
  console.log(login.value.safeParse(state.value));
}

const errorHandle = (event: FormErrorEvent) => {
  console.log(login.value.safeParse(state.value));
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const isFV = computed(() => {
  if (props.mode === "auth") return login.value.safeParse(state.value).success;
  if (props.mode === "insc") return login.value.safeParse(state.value).success;
});
</script>

<template>
  <UCard v-if="us.waitCode != props.mode">
    <UForm :schema="login" :state="state" @submit="handleLogin" @error="errorHandle">
      <UFormGroup label="" name="email">
        <UInput v-model="state.email" type="email" placeholder="Votre adresse mail" />
      </UFormGroup>

      <UFormGroup name="cgu">
        <UCheckbox v-model="state.cgu" class="mt-4 justify-center" v-if="mode === 'insc'">
          <template #label>
            <UButton
              @click="state.cgu = !state.cgu"
              variant="ghost"
              color="black"
              :padded="false"
              >J'ai bien lu et j'accepte les CGU</UButton
            >
          </template>
        </UCheckbox>
      </UFormGroup>
    </UForm>

    <div class="flex flex-row justify-around" v-if="mode === 'insc'">
      <UButton variant="ghost" to="/cgu" label="(Pour lire les CGU, c'est par ici)" />
    </div>

    <div class="flex flex-row justify-around mt-4">
      <UButton
        :disabled="!isFV"
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
      @keyup.enter="validateOTP"
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

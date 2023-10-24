<script lang="ts" setup>
const supabase = useSupabaseClient();
const toast = useToast();
const us = useCounterStore();

const props = defineProps(["email"]);
const route = useRoute();

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
      email: props.email,
      token: OTPcode.value,
      type: "email",
    });
    if (error) throw error;
    us.user = data.user;
    us.getUserData();
    if (route.redirectedFrom) await navigateTo(route.redirectedFrom.fullPath);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <UCard>
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

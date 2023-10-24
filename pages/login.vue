<template>
  <UContainer>
    <UTabs :items="tabs" class="w-full max-w-sm m-auto">
      <template #item="{ item }">
        <Login :mode="item.key" />
      </template>
    </UTabs>
  </UContainer>
</template>

<script setup>
const us = useCounterStore();
if (us.user) await navigateTo("/");

const tabs = [
  {
    key: "auth",
    label: "Se connecter",
  },
  {
    key: "insc",
    label: "Créer un compte",
  },
];
</script>

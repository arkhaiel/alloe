<script setup>
const appState = useAppState();
const us = useCounterStore();

// <UFormGroup label="Avatar" class="my-4 text-center">
//         <UserAvatar v-if="userData.avatar_url" />
//         <AvatarW v-else />
// </UFormGroup>
</script>

<template>
  <UCard v-if="us.userData">
    <template #header>
      <div class="prose dark:prose-invert">
        <h2>Bienvenue {{ us.userData.username }} !</h2>
        <p>
          En attendant le jour J, il est possible de personnaliser son compte. Pour
          l'instant, deux informations : le pseudo auquel seront associés tes chapitres et
          la bio que tu voudrais partager avec les autres utilisateurs.
        </p>
      </div>
    </template>

    <UFormGroup label="Pseudo">
      <UInput v-model="us.userData.username" />
    </UFormGroup>

    <UFormGroup label="Bio" class="my-4">
      <UInput v-model="us.userData.bio" placeholder="allez, on écrit !" />
    </UFormGroup>

    <UCheckbox v-model="us.userData.mailing" class="mt-4 justify-center">
      <template #label>
        <div class="cursor-pointer" @click="cgu = !cgu">
          Je veux recevoir les actus alloé par mail (aucune sollicitation commerciale)
        </div>
      </template>
    </UCheckbox>

    <template #footer>
      <div class="text-center">
        <UButton label="Enregistrer les modifications" @click="us.saveUserData()" />
      </div>
    </template>
  </UCard>
</template>

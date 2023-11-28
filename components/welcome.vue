<script setup>
import { tutoToggle } from '~/composables/globalFuncs';

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
      <div class="prose dark:prose-invert max-w-full prose-h2:m-0 flex flex-row justify-between">
        <h2>Bienvenue {{ us.userData.username }} !</h2>
        <div class="flex flex-row">
          <UColorModeButton />
          <LayoutColorPicker />
        </div>
      </div>
    </template>

    <UFormGroup label="Pseudo">
      <UInput v-model="us.userData.username" />
    </UFormGroup>

    <UFormGroup label="Bio" class="my-4">
      <UInput v-model="us.userData.bio" placeholder="allez, on écrit !" />
    </UFormGroup>

    <UFormGroup label="L'écran que je veux voir par défaut que je vais sur la page 'mes-textes' :" class="my-4">
      <USelect v-model="us.userData.favPanel" :options="[{ label: 'Lectures, pour accéder plus rapidement aux histoires que je lis', value: 1}, { label: 'Chapitres, pour accéder plus rapidement à mes chapitres', value: 2}]" />
    </UFormGroup>

    <UCheckbox v-model="us.userData.tuto" class="mt-4 justify-start">
      <template #label>
        <div class="cursor-pointer" @click="tutoToggle">
          Je veux afficher le tutoriel sur toutes les pages.
        </div>
      </template>
    </UCheckbox>

    <UCheckbox v-model="us.userData.mailing" class="mt-4 justify-start">
      <template #label>
        <div class="cursor-pointer" @click="us.userData.mailing = !us.userData.mailing">
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

<script setup>
const user = useSupabaseUser()
const userData = useUserData()
</script>

<template>
    <UCard v-if="userData">
    <template #header>
        <p>Bienvenue {{ userData.username }} !</p>
        <p>En attendant le jour J, il est possible de personnaliser son compte. Pour l'instant, trois informations : le pseudo auquel seront associés tes chapitres, la bio que tu voudrais partager avec les autres utilisateurs, et l'avatar que tu voudrais associer à ton compte.</p>
    </template>


    <UFormGroup label="Pseudo">
    <UInput v-model="userData.username" />
    </UFormGroup>

    <UFormGroup label="Bio" class="my-4">
    <UInput v-model="userData.bio" />
    </UFormGroup>

    <template #footer>
    <AvatarW v-if="false" />
    </template>
    </UCard>
</template>

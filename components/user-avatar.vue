<template>
  <div>
    <UAvatar :src="appState.avatarPath" :alt="userData.username" size="3xl">
    <UButton icon="i-heroicons-x-mark" class="absolute top-0 right-0" @click="delAvatar" />
    </UAvatar>
  </div>
</template>

<script setup>
const userData = useUserData()
const supabase = useSupabaseClient()
const appState = useAppState()

const delAvatar = () => {
  userData.value.avatar_url = ''
}
</script>

<style>

</style>


<template>
  <div v-if="s.loggedIn.value === false">
    <InputText v-model="loginData.identifier" placeholder="Email" />
    <InputText v-model="loginData.password" placeholder="Password" />
    <Button label="Login" @click="login" />
  </div>
  <div v-else>
    {{ s }}
    <Button label="Logout" @click="s.clear()" />
  </div>
</template>

<script lang="ts" setup>
const s = useUserSession()
const loginData = ref({
  identifier: 'admin',
  password: 'admin',
})

const login = async () => {
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: loginData.value,
  }).then((res) => {
    if (res.success) {
      s.fetch()
    }
  })
}
</script>

<style></style>

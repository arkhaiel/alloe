<script setup>
const supabase = useSupabaseClient()
const userData = useUserData()
const path = ref('')

const uploading = ref(false)
const src = ref('')
const files = ref()

const uploadAvatar = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { data, error } = await supabase.storage.from('avatars').upload(filePath, file)

    console.log(data)
    if (error) throw error
    userData.value.avatar_url = data.path
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}
</script>

<template>

    <div>
      <UInput type="file" accept="image/*" id="single" @change="uploadAvatar" :disabled="uploading" v-model="src" />
    </div>
</template>
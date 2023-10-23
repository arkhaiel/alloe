export const useAppState = () => {
  return useState('appState', () => {
    return {
    'accPanel': false,
    'creaActiPanel': false,
    'avatarPath': ''
  }
  })
}

export const downloadImage = async () => {
  try {
    const supabase = useSupabaseClient()
    const userData = useState('userData')
    const appState = useAppState()

    const { data, error } = await supabase.storage.from('avatars').download(userData.value.avatar_url)
    if (error) throw error
    appState.value.avatarPath = URL.createObjectURL(data)
  } catch (error: any) {
    console.error('Error downloading image: ', error.message)
  }
}

export const createBlankProfile = async () => {
  const us = useCounterStore()

  if (us.user) {
    try {
      const { data, error } = await us.supabase
        .from('users')
        .insert({ id: us.user.id })
        .select()
      if (error) throw error;
      return data[0]
    } catch (error) {
      console.log(error)
    }
  }
}

export const useUserData = async () => {
  const us = useCounterStore()

  if(us.user)
  try {  
    const { data, error } = await us.supabase
    .from('users')
    .select('*')
    .eq('id', us.user.id)
    .single()

    if (error) throw error
    return data
  } catch (error: any) {
    if (error.code === 'PGRST116') return await createBlankProfile()
  }
}

export const useSaveUserData = async () => {
  const us = useCounterStore()
  const toast = useToast()

  if(us.user?.id)
  try {
    const {data, error} = await us.supabase
    .from('users')
    .update(us.userData)
    .eq('id', us.user.id)
    .select()

    if(error) throw error

    toast.add({ title: 'Vos informations ont été mises à jour.' })    
    return data[0]
  } catch (error) {
    console.error(error);
    
  }
}
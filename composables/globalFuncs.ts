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
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

export const useUserData = (rfr) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const userData = useState('userData')

  // console.log(userData);
  

  const getData = async() => {
    const userData = useState('userData')
    try {
      if(!user.value) throw 'Pas de connexion'
  
      const res = await supabase
      .from('users')
      .select('id, username, bio, avatar_url, mailing')
      .eq('id', user.value.id)
      .single()
  
      if (res.error) throw res.error
      userData.value = res.data

    } catch(error) {
      if(error.code === 'PGRST116') {
          try {
            const user = useSupabaseUser()  
            const rres = await supabase.from('users').insert({ id: user.value.id })
  
            if (rres.error) throw rres.console.error();
            getData()
          } catch(error) {
            console.log(error)
          }
      }
    }
  }

  if(!userData.value){
    // console.log('update');
    
    getData()
  } 
  else if(rfr === true) getData()
  return userData
}

export const saveUserData = async () => {
  const supabase = useSupabaseClient()
  const userData = useUserData()
  const toast = useToast()

  try {
    const res = await supabase
    .from('users')
    .update(userData.value)
    .eq('id', userData.value.id)
    .select()

    if(res.error) throw res.error

    userData.value = res.data[0]
    toast.add({ title: 'Vos informations ont été mises à jour.'})
  } catch (error) {
    
  }
}
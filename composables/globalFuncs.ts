export const useAppState = () => {
  return useState('appState', () => {
    return {
    'accPanel': false,
    'creaActiPanel': false
  }
  })
}

export const useUserData = () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const userData = useState('userData', () => {})

  const getData = async() => {
    const userData = useState('userData', () => {})
    try {
      if(!user.value) throw 'Pas de connexion'
  
      const res = await supabase
      .from('users')
      .select('id, username, bio, avatar_url')
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

  getData()
  return userData
}
import { useCounterStore } from './../stores/counter';
import type { Database } from '~/database.types'

export const findParent = (story: any, enfant: any) => {
  if(story.length >= 1) {
    return story.find((el: any) => el.enfant === enfant) ? story.find((el: any) => el.enfant === enfant).parent : null
  } 
};

export const useGetRoots = async () => {
  const supabase = useSupabaseClient<Database>()
  try {
    const { data, error } = await supabase.from("root_chapters").select("*, chapters(*, parchild!parchild_parent_fkey(chapters!parchild_enfant_fkey(*)))")
    if(error) throw error   
    
    return data.map(el => {
      const {chapters, ...root} = el
      const { parchild: enfants, ...chapter} = chapters
      return {
        enfants: enfants.map((el: any) => el.chapters),
        root: { ...chapter, ...root },
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export const useGetStory = async (id: string) => {
  const supabase = useSupabaseClient<Database>()
  try {
    const { data, error } = await supabase.rpc("get_story", { my_id: id })
    if(error) throw error
    
    return data
  } catch (error) {
    console.error(error);
  }
}

export const useGetChaps = async (story: string[]) => {
  const supabase = useSupabaseClient<Database>()
  try {
    const {data, error} = await supabase.from("chapters").select("*, user_view(username))").in("id", story);
    if(error) throw error
    return data.map(el => {
      return {
        ...el,
        author: el.user_view.username
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export const useUserChaps = async () => {
  const supabase = useSupabaseClient<Database>()
  const us = useCounterStore()

  try {
    const {data, error} = await supabase.from("chapters").select("*").eq("author", us.user.id);
    if(error) throw error
    return data
  } catch (error) {
    console.error(error);
  }
}

export const useGetChildren = async(chap_id: string) => {
  const supabase = useSupabaseClient<Database>()
  try {
    const { data, error } = await supabase.from('parchild').select('enfant(*)').eq('parent', chap_id);
    if(error) throw error
    return data.map(el => el.enfant)
  } catch (error) {
    console.error(error);
  }
}

export const useNewReading = async(chap_id: string, root: any) => {
  const supabase = useSupabaseClient<Database>()
  const us = useCounterStore()
  try {
    const { data, error } = await supabase.from('readings').insert({ user: us.user.id, last_chap: chap_id, root_chap: root.id, title: root.title }).select();
    if(error) throw error
    
    return data[0]
  } catch (error) {
    console.error(error);
  }
}

export const getFullReading = async() => {
  const read = useReadingStore();
  read.storyList = [read.reading.last_chap]

  read.data = await useGetStory(read.storyList[0])

  read.enfants = read.data.filter((el: any) => el.parent === read.storyList[0]).map((el: any) => el.enfant)

  while(read.storyList[0] !== read.current.root.chapter)
    read.storyList.unshift(findParent(read.data, read.storyList[0]))

  read.data = await useGetChaps(read.storyList)
  read.story = read.storyList.map((el: string) => read.data.find((el0: any) => el0.id === el))

  return true
}

export const nextChap 
= async (child: any, reading_id: string, update = false) => {
  // const supabase = useSupabaseClient<Database>()
  const read = useReadingStore()
  const toast = useToast()
  read.story.push(child)
  read.storyList.push(child.id)
  read.enfants = await useGetChildren(child.id)
  if(update) {
    try {
    const { data, error } = await read.sb.from('readings').update({ last_chap: child.id, size: read.reading.size + 1 }).eq('id', reading_id).select();
    if(error) throw error
    
    toast.add({ title: "Chapitre ajouté à votre histoire"})
    read.reading = data[0]
  } catch (error) {
    console.error(error);
  } } else return 'ok'
}

export const prevChap 
= async (update = false) => {
  const supabase = useSupabaseClient<Database>()
  const read = useReadingStore()
  const toast = useToast()
  read.story.pop()
  read.storyList.pop()
  read.enfants = await useGetChildren(read.storyList[read.storyList.length - 1])
  if(update) {
    try {
    const { data, error } = await supabase.from('readings').update({ last_chap: child.id, size: read.reading.size + 1 }).eq('id', reading_id).select();
    if(error) throw error
    
    toast.add({ title: "Histoire mise à jour"})
    read.reading = data[0]
  } catch (error) {
    console.error(error);
  } } else return 'ok'
}

export const useGetReadings = async () => {
  const supabase = useSupabaseClient<Database>()
  try {
    const { data, error } = await supabase.from('readings').select('*');
    if(error) throw error
    return data
  } catch (error) {
    console.error(error);
  }
}

export const useCreateBlankChap = async(parent: string) => {
  const supabase = useSupabaseClient<Database>()
  try {
    const {data: chap, error: e1} = await supabase.from('chapters').insert({}).select()
    if(e1) throw e1
    const {data, error: e2} = await supabase.from('parchild').insert({ parent: parent, enfant: chap[0].id})
    if(e2) throw e2

    return chap[0].id
  } catch (error) {
    console.error(error);    
  }
}

export const useUpdateChap = async(text, chid) => {
  const supabase = useSupabaseClient<Database>()
  const toast = useToast()
  try {
    const {data: chap, error: e1} = await supabase.from('chapters').upsert({ id: chid, text: text }).select()
    if(e1) throw e1
    toast.add({ title: "Modifications enregistrées."})
  } catch (error) {
    console.error(error);    
  }
}

export const useGetUsers = async() => {
  const supabase = useSupabaseClient<Database>()
  try {
    const {data: users, error: e1} = await supabase.from('user_view').select()
    if(e1) throw e1
    return users.reduce((acc, obj) => {
      acc[obj.id] = obj.username
      return acc
    }, {})
  } catch (error) {
    console.error(error);    
  }
}
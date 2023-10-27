import type { Database } from '~/database.types'

export const findParent = (story: any, enfant: any) => {
  if (story.length > 1) {
    const tmp = story.find((el: any) => el.enfant === enfant);
    if (tmp) return tmp.parent;
  } else return null;
};

export const useGetRoots = async () => {
  const supabase = useSupabaseClient<Database>()
  try {
    const { data, error } = await supabase.from("root_chapters").select("*, chapters(*, parchild!parchild_parent_fkey(chapters!parchild_enfant_fkey(*)))")
    if(error) throw error   
    console.log(data);
    
    return data.map(el => {
      const {chapters, ...root} = el
      const { parchild: enfants, ...chapter} = chapters
      return {
        enfants: enfants.map((el: any) => el.chapters),
        root: { ...root, ...chapter },
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
    const {data, error} = await supabase.from("chapters").select("*").in("id", story);
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

export const useNewReading = async(chap_id: string) => {
  const supabase = useSupabaseClient<Database>()
  const us = useCounterStore()
  try {
    const { data, error } = await supabase.from('readings').insert({ user: us.user.id, last_chap: chap_id }).select();
    if(error) throw error
    
    return data
  } catch (error) {
    console.error(error);
  }
}

export const getFullReading = async(lastChap_id: string) => {
  const read = useReadingStore();
  read.story = [lastChap_id]

  read.data = await useGetStory(read.story[0])

  read.enfants = read.data.filter((el: any) => el.parent === read.story[0]).map((el: any) => el.enfant)

  while(findParent(read.data, read.story[0])) {
    read.story.unshift(findParent(read.data, read.story[0]))
  }

  read.data = await useGetChaps(read.story)
  read.story = read.story.map((el: string) => read.data.find((el0: any) => el0.id === el))

  return true
}

export const prevnextChap 
= async (child: any, reading_id: string) => {
  const supabase = useSupabaseClient<Database>()
  const read = useReadingStore()
  read.story.push(child)
  read.enfants = await useGetChildren(child.id)
  try {
    const { data, error } = await supabase.from('readings').update({ last_chap: child.id }).eq('id', reading_id);
    if(error) throw error
    
    return data
  } catch (error) {
    console.error(error);
  }
}
import { listChap } from '~/utils/abilities'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  console.log('query', query);
  
  if (query && Object.keys(query).includes('user')) {
    await authorize(event, listChap)
    const { user } = await getUserSession(event)
    return await useDrizzle().select().from(tables.chapters).where(eq(tables.chapters.authorId, user.id))
  }
  const res = await useDrizzle().select().from(tables.chapters)
  return res
})

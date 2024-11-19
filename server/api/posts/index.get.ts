import { listPosts } from '~~/shared/utils/abilities'

export default defineEventHandler(async (event) => {
  await authorize(event, listPosts)
  const res = await useDrizzle().select().from(tables.chapters)
  return res
})

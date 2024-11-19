import { listPost } from '~/utils/abilities'

export default defineEventHandler(async (event) => {
  await authorize(event, listPost)
  const res = await useDrizzle().select().from(tables.chapters)
  return res
})

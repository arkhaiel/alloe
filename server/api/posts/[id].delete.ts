
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''

  const res = await useDrizzle().delete(tables.chapters).where(eq(tables.chapters.id, id)).returning()
  return res
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw new Error('ID parameter is missing')
  }

  const res = await useDrizzle().select().from(tables.chapters).where(eq(tables.chapters.id, id))
  return res
})

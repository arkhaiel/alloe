export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = getRouterParam(event, 'id')

  const res = await useDrizzle().update(tables.chapters).set(body).where(eq(tables.chapters.id, id)).returning()
  return res
})

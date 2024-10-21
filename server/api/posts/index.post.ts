export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await useDrizzle().insert(tables.chapters).values(body).returning()
  return res
})

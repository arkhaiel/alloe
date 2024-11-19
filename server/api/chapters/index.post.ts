import { postChap } from '~/utils/abilities'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await authorize(event, postChap)
  const { user } = await getUserSession(event)
  console.log('user', user);
  if (!user) throw new Error('User not found')
  const res = await useDrizzle().insert(tables.chapters).values({ authorId: user.id, text: JSON.stringify(body) }).returning()
  return body
})

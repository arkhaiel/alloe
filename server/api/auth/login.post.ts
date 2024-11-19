import { createId } from '@paralleldrive/cuid2'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { identifier, password } = body
    
    // Vérifier si l'email existe déjà dans la base de données
    const existingUser = await useDrizzle()
      .select()
      .from(tables.authMethods)
      .leftJoin(tables.users, eq(tables.authMethods.userId, tables.users.id))
      .where(eq(tables.authMethods.identifier, identifier))

    if (existingUser.length > 0) { // le compte existe déjà
      const { auth_methods: auth, users: user } = existingUser[0]
      
      if (auth.type === 'password' && auth.hashedPassword && await verifyPassword(auth.hashedPassword, password)) {
        await useDrizzle().update(tables.authMethods).set({ counter: auth.counter + 1 }).where(eq(tables.authMethods.id, auth.id)).returning()
        if (!user) throw new Error('Le compte existe déjà, mais l\'utilisateur est introuvable')
        await replaceUserSession(event, { user: user })
        return { success: true, message: 'Identifiants corrects', data: user }
      } else {
        throw new Error('Le compte existe déjà, mais le mot de passe est incorrect')
      }
    }

    // Si le compte n'existe pas, créer un hash du mot de passe et un uid
    const hash = await hashPassword(password)
    const userId = createId()

    const user = await useDrizzle().insert(tables.users).values({ id: userId }).returning()
    const data = await useDrizzle().insert(tables.authMethods).values({ type: 'password', userId: userId, identifier: identifier, hashedPassword: hash }).returning()
        
    await replaceUserSession(event, { user: user[0] })

    // Retourner une réponse réussie
    return { success: true, message: 'Le compte a bien été créé', data }

  } catch (err: any) {
    // Gérer les erreurs
    return { success: false, message: err.message }
  }
})

export const listPost = defineAbility(() => true) // Only authenticated users can list posts
export const listChap = defineAbility(() => true) // Only authenticated users can list posts
export const postChap = defineAbility(() => true) // Only authenticated users can list posts

export const editChap = defineAbility((user: User, chap: Chapter) => {
  return user.id === chap.authorId
})

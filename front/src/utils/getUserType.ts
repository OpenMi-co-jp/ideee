type UserType = 'エンジニア' | 'アイディアマン' | ''

export const getUserType = (definition: string | undefined): UserType => {
  switch (definition) {
    case 'engineer':
      return 'エンジニア'
    case 'idea_engineer':
      return 'アイディアマン'
    default:
      return ''
  }
}

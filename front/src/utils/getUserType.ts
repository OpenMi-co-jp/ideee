type UserType = 'エンジニア' | 'アイデアマン' | 'アイデアマン兼エンジニア'

export const getUserType = (definition: string | undefined): UserType => {
  switch (definition) {
    case 'engineer':
      return 'エンジニア'
    case 'idea_man':
      return 'アイデアマン'
    default:
      return 'アイデアマン兼エンジニア'
  }
}

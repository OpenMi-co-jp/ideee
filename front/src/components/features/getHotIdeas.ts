import { gql } from '@apollo/client'

export const getHotIdeas = gql`
  query GetHotIdeas {
    hotIdeas {
      id
      name
      user {
        icon
      }
    }
  }
`

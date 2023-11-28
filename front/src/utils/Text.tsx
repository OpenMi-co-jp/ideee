import { FC } from 'react'
import { Text, Anchor } from '@mantine/core'
import reactStringReplace from 'react-string-replace'

export const TextWithLinks: FC<{ children: string }> = ({ children }) => {
  // URLを見つけるための正規表現
  const urlRegex = /(https?:\/\/\S+)/g

  return (
    <Text style={{ whiteSpace: 'pre-line' }}>
      {reactStringReplace(children, urlRegex, (match, i) => (
        <Anchor href={match} target="_blank" rel="noopener noreferrer">
          {match}
        </Anchor>
      ))}
    </Text>
  )
}

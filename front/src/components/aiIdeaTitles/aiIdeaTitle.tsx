import { aiIdeaTitleType } from '@/types/idea'
import { Text, Paper } from '@mantine/core'
import type { FC } from 'react'

export const AiIdeaTitle: FC<aiIdeaTitleType> = ({ title }) => {
  return (
    <Paper
      shadow="md"
      radius="md"
      p="sm"
      withBorder
      style={{ position: 'relative' }}
    >
      <Text
        lineClamp={2}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {title}
      </Text>
    </Paper>
  )
}

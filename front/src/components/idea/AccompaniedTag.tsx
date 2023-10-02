import React from 'react'
import { Text } from '@mantine/core'
import { AccompaniedTagType } from '@/types/idea'

export const AccompaniedTag = ({ tag }: AccompaniedTagType) => {
  const { name } = tag
  return (
    <>
      <Text size="lg" c="#EAAE59">#{name}</Text>
    </>
  )
}

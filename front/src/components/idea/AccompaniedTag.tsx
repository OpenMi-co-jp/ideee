import React from 'react'
import { AccompaniedTagType } from '@/types/idea'

export const AccompaniedTag = ({ tag }: AccompaniedTagType) => {
  const { name } = tag
  return (
    <>
      <div>{name}</div>
    </>
  )
}

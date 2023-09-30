import React from 'react'

type AccompaniedTag = {
  tag: {
    id: string
    name: string
  }
}

export const AccompaniedTag = ({ tag }: AccompaniedTag) => {
  const { name } = tag
  return (
    <>
      <div>{name}</div>
    </>
  )
}

import { Button } from '@mantine/core'
import * as React from 'react'
import { handleSignOut } from './handleSignOut'

export const SignOutForm = () => {
  const onSubmit = () => handleSignOut()

  return (
    <form onSubmit={onSubmit}>
      <Button color="yellow" type="submit">ログアウト</Button>
    </form>
  )
}

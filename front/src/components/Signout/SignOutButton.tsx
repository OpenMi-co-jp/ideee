import { Button } from '@mantine/core'
import * as React from 'react'
import { handleSignOut } from './handleSignOut'

export const SignOutButton = () => {
  const onSubmit = () => handleSignOut()

  return (
    <Button color="yellow" onClick={onSubmit}>
      ログアウト
    </Button>
  )
}

import { Button } from '@mantine/core'
import * as React from 'react'
import { handleSignOut } from './hooks'
import { useLoggedIn } from '@/components/loginContext'

export const SignOutButton = () => {
  const { setLoggedIn } = useLoggedIn()
  const onSubmit = () => handleSignOut(setLoggedIn)

  return (
    <Button color="yellow" onClick={onSubmit}>
      ログアウト
    </Button>
  )
}

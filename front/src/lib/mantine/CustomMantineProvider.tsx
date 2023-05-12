import { Notifications } from '@mantine/notifications'
import type { FC, ReactNode } from 'react'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

export const CustomMantineProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  )
}

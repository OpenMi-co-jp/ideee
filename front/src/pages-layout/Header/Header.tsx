import {
  Box,
  Group,
  Portal,
  rem,
  Container,
  Space,
  Text,
  Card,
} from '@mantine/core'
import type { FC } from 'react'
import { useHeadroom, useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import { SearchIcon } from './headerComponents'
import { UserToggle, Notification } from './headerComponents'
import { IdeaCreateButton } from '@/components/idea/createButton'
import Link from 'next/link'

export const Header: FC = () => {
  const pinned = useHeadroom({ fixedAt: 120 })
  const isMobile = useMediaQuery(`(max-width: ${rem(550)})`)
  const imgWidth = isMobile ? 100 : 140
  const imgHeight = (45 / 140) * imgWidth

  return (
    <Portal>
      <Box
        px="lg"
        py="sm"
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: isMobile ? `calc(80px / 90vw)` : rem(70),
          zIndex: 200, // modalのindexがが201のため
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
          transition: 'transform 400ms ease',
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.black : theme.white,
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        })}
      >
        <Group position="apart">
          <Link href="/">
            <Image
              src={
                isMobile
                  ? '/img/mobile_version_icon.png'
                  : '/img/IdeeeLogo.webp'
              }
              alt="ideeeのロゴ"
              width={isMobile ? 40 : imgWidth}
              height={isMobile ? 40 : imgHeight}
            />
          </Link>

          <Group position="center">
            <Text mb="-0.5rem">
              <SearchIcon />
            </Text>
            <Notification />
            <UserToggle />
            <IdeaCreateButton />
          </Group>
        </Group>
      </Box>
    </Portal>
  )
}

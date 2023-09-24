import { Box, Group, Portal, rem, Container } from '@mantine/core'
import type { FC } from 'react'
import { useHeadroom } from '@mantine/hooks'
import Image from 'next/image'
import { SearchIcon } from './headerComponents'
import { UserToggle, Notification } from './headerComponents'
import { IdeaCreateButton } from '@/components/idea/createButton'
import Link from 'next/link'

export const Header: FC = () => {
  const pinned = useHeadroom({ fixedAt: 120 })

  return (
    <Portal>
      <Box
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: theme.spacing.xs,
          height: rem(70),
          zIndex: 200, // modalのindexがが201のため
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
          transition: 'transform 400ms ease',
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.black : theme.white,
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        })}
      >
        <Group position="apart" mx="auto" noWrap>
          <Link href="/">
            <Image
              src="/img/IdeeeLogo.webp"
              alt="ideeeのロゴ"
              width={140}
              height={45}
            />
          </Link>
          <Group position="right" noWrap>
            <Container
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.9rem',
              }}
            >
              <SearchIcon />
              <Notification />
              <UserToggle />
              <IdeaCreateButton />
            </Container>
          </Group>
        </Group>
      </Box>
    </Portal>
  )
}

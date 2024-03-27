import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Box,
  useMantineColorScheme,
  Flex,
} from '@mantine/core'

import { IconBrandTwitter, IconNews } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface FooterLinksProps {
  data: {
    title: string
    links: { label: string; link: string; isExternal: boolean }[]
  }[]
}

export const FooterForm = (footerData: FooterLinksProps) => {
  const { colorScheme } = useMantineColorScheme()
  const currentYear = new Date().getFullYear()
  const groups = footerData.data.map((data) => {
    const links = data.links.map((link, index) => (
      <Link
        key={index}
        href={link.link}
        target="_blank"
        {...(link.isExternal && { rel: 'noopener noreferrer' })}
      >
        <Text
          style={(theme) => ({
            display: 'block',
            color:
              colorScheme === 'dark'
                ? theme.colors.dark[1]
                : theme.colors.gray[6],
            fontSize: theme.fontSizes.sm,
            paddingTop: rem(3),
            paddingBottom: rem(3),

            '&:hover': {
              textDecoration: 'underline',
            },
          })}
        >
          {link.label}
        </Text>
      </Link>
    ))

    return (
      <Box
        key={data.title}
        style={{
          width: rem(160),
        }}
      >
        <Text
          style={(theme) => ({
            fontSize: theme.fontSizes.lg,
            fontWeight: 700,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            marginBottom: `calc(${theme.spacing.xs} / 2)`,
            color: colorScheme === 'dark' ? theme.white : theme.black,
          })}
        >
          {data.title}
        </Text>
        {links}
      </Box>
    )
  })

  return (
    <footer>
      <Box
        mt={rem(120)}
        style={(theme) => ({
          paddingTop: `calc(${theme.spacing.xl} * 2)`,
          paddingBottom: `calc(${theme.spacing.xl} * 2)`,
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          borderTop: `${rem(1)} solid ${
            colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
          }`,
        })}
      >
        <Container>
          <Flex
            justify="space-between"
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'center', sm: 'flex-start' }}
          >
            <Flex
              maw={rem(200)}
              direction={'column'}
              align={{ base: 'center', sm: 'flex-start' }}
            >
              <Link href="/">
                <Image
                  src="/img/IdeeeLogo.webp"
                  alt="ideeeのロゴ"
                  width={150}
                  height={50}
                />
              </Link>
              <Text
                size="xs"
                c="dimmed"
                mt={{ base: 'xs', sm: rem(5) }}
                ta={{ base: 'center', sm: 'left' }}
              >
                あなたの才能で世界をちょっとだけ良くする
              </Text>
            </Flex>
            <Flex wrap="wrap" display={{ base: 'none', sm: 'flex' }}>
              {groups}
            </Flex>
          </Flex>
        </Container>
        <Container
          style={(theme) => ({
            marginTop: theme.spacing.xl,
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
            borderTop: `${rem(1)} solid ${
              colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          })}
        >
          <Flex
            justify="space-between"
            align="center"
            direction={{ base: 'column', sm: 'row' }}
          >
            <Text c="dimmed" size="sm">
              © {currentYear} ideee.tech All rights reserved.
            </Text>
            <Group
              gap={0}
              wrap="nowrap"
              align="start"
              mt={{ base: 'xs', sm: 0 }}
            >
              <Link
                href="https://twitter.com/ideee_tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ActionIcon
                  size="lg"
                  c="dimmed"
                  style={(theme) => ({
                    backgroundColor:
                      colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  })}
                >
                  <IconBrandTwitter size="1.05rem" stroke={1.5} />
                </ActionIcon>
              </Link>
              <Link
                href="https://qiita.com/naruqiita/items/0ef4b963434226eacb6b"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ActionIcon
                  size="lg"
                  c="dimmed"
                  style={(theme) => ({
                    backgroundColor:
                      colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  })}
                >
                  <IconNews size="1.05rem" stroke={1.5} />
                </ActionIcon>
              </Link>
            </Group>
          </Flex>
        </Container>
      </Box>
    </footer>
  )
}

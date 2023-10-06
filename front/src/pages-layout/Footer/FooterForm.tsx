import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Box,
  useMantineColorScheme,
} from '@mantine/core'

import { IconBrandTwitter, IconNews } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

interface FooterLinksProps {
  data: {
    title: string
    links: { label: string; link: string }[]
  }[]
}

export const FooterForm = (footerData: FooterLinksProps) => {
  const { colorScheme } = useMantineColorScheme()
  const groups = footerData.data.map((data) => {
    const links = data.links.map((link, index) => (
      <Link key={index}
        href={link.link}>
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
        <Box key={data.title}
          style={{
            width: rem(160),
          }}>
          <Text
            style={(theme) => ({
              fontSize: theme.fontSizes.lg,
              fontWeight: 700,
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              marginBottom: `calc(${theme.spacing.xs} / 2)`,
              color: colorScheme === 'dark' ? theme.white : theme.black,
            })}
          >{data.title}</Text>
          {links}
        </Box>
    )
  })

  return (
    <footer>
      <Box
        style={(theme) => ({
          marginTop: rem(120),
          paddingTop: `calc(${theme.spacing.xl} * 2)`,
          paddingBottom: `calc(${theme.spacing.xl} * 2)`,
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          borderTop: `${rem(1)} solid ${colorScheme === 'dark' ?
            theme.colors.dark[5] : theme.colors.gray[2]
            }`,
        })}
      >
        <Container
          style={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',

            // [theme.fn.smallerThan('sm')]: {
            // flexDirection: 'column',
            // alignItems: 'center',
            // },
          })}
        >
            <Box
              style={(theme) => ({
                maxWidth: rem(200),

                // [theme.fn.smallerThan('sm')]: {
                //   display: 'flex',
                //   flexDirection: 'column',
                //   alignItems: 'center',
                // },
              })}
            >
              <Image
                src="/img/IdeeeLogo.webp"
                alt="ideeeのロゴ"
                width={150}
                height={50}
              />
              <Text size="xs" c="dimmed"
                style={(theme) => ({
                  marginTop: rem(5),

                  // [theme.fn.smallerThan('sm')]: {
                  //   marginTop: theme.spacing.xs,
                  //   textAlign: 'center',
                  // },
                })}
              >
                あなたの才能で世界をちょっとだけ良くする
              </Text>
            </Box>
            <Box
              style={(theme) => ({
                display: 'flex',
                flexWrap: 'wrap',

                // [theme.fn.smallerThan('sm')]: {
                // display: 'none',
                // },
              })}
            >
              {groups}
            </Box>
        </Container>
        <Container
          style={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing.xl,
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
            borderTop: `${rem(1)} solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
              }`,

            // [theme.fn.smallerThan('sm')]: {
            // flexDirection: 'column',
            // },
          })}
        >
          <Text c="dimmed" size="sm">
            © 2022 ideee.tech All rights reserved.
          </Text>

          <Group
            gap={0}
            wrap='nowrap'
            align="start"
            style={(theme) => ({
              // [theme.fn.smallerThan('sm')]: {
              //   marginTop: theme.spacing.xs,
              // },
            })}
          >
            <ActionIcon size="lg"
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
            <ActionIcon size="lg"
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
          </Group>
        </Container>
      </Box>
    </footer>
  )
}

import React from 'react'
import { createStyles, Text, Paper, Avatar, Flex } from '@mantine/core'
import Link from 'next/link'
import type { FC } from 'react'
import { IdeaBoxType } from '@/types/idea'

const useStyles = createStyles(() => ({
  CardIcon: {
    '@media (max-width: 649px)': {
      height: 45,
      width: 45,
      minWidth: 45,

      '.mantine-Avatar-placeholder': {
        minWidth: 45,
        margin: 'auto',
      },
    },
  },

  CardUserTitle: {
    inlineSize: '250px',
    overflowWrap: 'break-word',

    '@media (max-width: 649px)': {
      inlineSize: '180px',
    },
  },
}))

export const IdeaBox: FC<IdeaBoxType> = ({ id, name, user }) => {
  const { classes } = useStyles()
  return (
    <Link href={`/idea/${id}`}>
      <Paper shadow="md" radius="md" p="md" withBorder>
        <Flex justify="center" direction="row" wrap="wrap" gap="md">
          <Avatar radius="xl" size={60} className={classes.CardIcon} />
          <Text className={classes.CardUserTitle}>{name}</Text>
          <Avatar radius="xl" size={24} src={user?.icon} mt="xl" />
        </Flex>
      </Paper>
    </Link>
  )
}

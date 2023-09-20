import React from 'react'
import { createStyles, Text, Paper, Avatar, Flex } from '@mantine/core'
import type {
  GetHotIdeasQuery,
  GetDeployedIdeasQuery,
  GetActiveTeamIdeasQuery,
} from '@/lib/generated/client'
import Link from 'next/link'

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

type IdeasType = {
  ideas:
    | GetHotIdeasQuery['hotIdeas']
    | GetDeployedIdeasQuery['deployedIdeas']
    | GetActiveTeamIdeasQuery['activeTeamIdeas']
    | undefined
}

export const IdeaList = (data: IdeasType) => {
  const { classes } = useStyles()
  const { ideas } = data
  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
      gap="md"
      my="xl"
      mx="md"
    >
      {ideas?.map((idea) => {
        return (
          <Link href={`/idea/${idea.id}`} key={idea.id}>
            <Paper key={idea.id} shadow="md" radius="md" p="md" withBorder>
              <Flex justify="center" direction="row" wrap="wrap" gap="md">
                <Avatar radius="xl" size={60} className={classes.CardIcon} />
                <Text className={classes.CardUserTitle}>{idea.name}</Text>
                <Avatar radius="xl" size={24} src={idea.user?.icon} mt="xl" />
              </Flex>
            </Paper>
          </Link>
        )
      })}
    </Flex>
  )
}

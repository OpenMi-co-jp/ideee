import React from 'react'
import {
  createStyles,
  Box,
  Title,
  Text,
  Paper,
  Avatar,
  Flex,
  Loader,
} from '@mantine/core'
import { useGetDeployedIdeasQuery } from '@/lib/generated/client'

const useStyles = createStyles(() => ({
  Box: {
    borderRadius: '40px',
    border: '3px solid #ED3C3C',
    marginTop: '50px',
    marginBottom: '50px',
  },

  Title: {
    color: '#9E9595',
    fontSize: '28px',
    marginTop: '24px',
    marginLeft: '80px',
    marginBottom: '15px',

    '@media (max-width: 649px)': {
      textAlign: 'center',
      margin: '0px',
      marginTop: '24px',
    },
  },
  CardContainer: {
    margin: '15px 0 25px 0',
    '@media (max-width: 649px)': {
      marginTop: '0px',
      marginLeft: '25px',
      marginRight: '25px',
    },
  },

  CardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 10px',
    width: '400px',

    '@media (max-width: 649px)': {
      padding: '10px',
      margin: '10px 10px',
    },
  },

  CardIcon: {
    marginRight: '10px',

    '@media (max-width: 649px)': {
      marginRight: '5px',
      height: 40,
      width: 40,
      minWidth: 40,

      '.mantine-Avatar-placeholder': {
        minWidth: 40,
        margin: 'auto',
      },
    },
  },

  CardUserTitle: {
    color: '#000',
    marginRight: '15px',
    inlineSize: '250px',
    overflowWrap: 'break-word',

    '@media (max-width: 649px)': {
      inlineSize: '200px',
      overflowWrap: 'break-word',
      marginRight: '5px',
    },
  },

  CardUserIcon: {
    marginTop: '25px',
  },
}))

const GetDeployedIdeas = () => {
  const { classes } = useStyles()
  const { loading, data } = useGetDeployedIdeasQuery()
  if (loading) return <Loader color="yellow" />
  const DeployedIdeas = data?.deployedIdeas
  return (
    <>
      <Box className={classes.Box}>
        <Title className={classes.Title}>実現したアイデア</Title>
        <Flex
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          className={classes.CardContainer}
        >
          {DeployedIdeas?.map((DeployedIdea) => {
            return (
              <Paper
                key={DeployedIdea.id}
                shadow="md"
                radius="md"
                p="md"
                className={classes.CardWrapper}
              >
                <Avatar radius="xl" size={60} className={classes.CardIcon} />
                <Text className={classes.CardUserTitle}>
                  {DeployedIdea.name}
                </Text>
                <Avatar
                  radius="xl"
                  size={24}
                  src={DeployedIdea.user.icon}
                  className={classes.CardUserIcon}
                />
              </Paper>
            )
          })}
        </Flex>
      </Box>
    </>
  )
}

export default GetDeployedIdeas

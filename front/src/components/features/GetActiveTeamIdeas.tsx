import React from 'react'
import { Box, Title, Text, Paper, Avatar, Flex, Loader } from '@mantine/core'
import { useGetActiveTeamIdeasQuery } from '@/lib/generated/client'

const GetActiveTeamIdeas = () => {
  const { loading, data } = useGetActiveTeamIdeasQuery()
  if (loading) return <Loader color="yellow" />;
  const TeamIdeas = data?.activeTeamIdeas
  return (
    <>
      <Box
        style={{
          borderRadius: '40px',
          border: '3px solid #E5AA37',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <Title
          style={{
            color: '#E5AA37',
            fontSize: '28px',
            marginTop: '24px',
            marginLeft: '80px',
            marginBottom: '15px',
          }}
        >
          チーム開発募集中のアイデア
        </Title>
        <Flex
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          style={{
            margin: '15px 0 25px 0',
          }}
        >
          {TeamIdeas?.map((TeamIdea) => {
            return (
              <Paper
                key={TeamIdea.id}
                shadow="md"
                radius="md"
                p="md"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '15px 45px',
                }}
              >
                <Avatar
                  radius="xl"
                  size={60}
                  style={{
                    marginRight: '10px',
                  }}
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: '25px',
                    marginRight: '15px',
                  }}
                >
                  {TeamIdea.name}
                </Text>
                <Avatar
                  radius="xl"
                  size={24}
                  src={TeamIdea.user.icon}
                  style={{
                    marginTop: '25px',
                  }}
                />
              </Paper>
            )
          })}
        </Flex>
      </Box>
    </>
  )
}

export default GetActiveTeamIdeas

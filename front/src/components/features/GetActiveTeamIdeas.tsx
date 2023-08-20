import React from 'react'
import { Box, Title, Text, Paper, Avatar, Flex } from '@mantine/core'
import { useGetActiveTeamIdeasQuery } from '@/lib/generated/client'

const GetActiveTeamIdeas = () => {
  const { loading, data } = useGetActiveTeamIdeasQuery()
  if (loading) return <p>Loading...</p>
  const TeamIdeas = data?.activeTeamIdeas
  console.log(TeamIdeas)
  return (
    <>
      <Box
        style={{
          borderRadius: '40px',
          border: '3px solid #E5AA37',
          background: '#FFF',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <Title
          style={{
            color: '#E5AA37',
            fontFamily: 'Inter',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 800,
            lineHeight: 'normal',
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
                    fontFamily: 'Inter',
                    fontSize: '25px',
                    fontStyle: 'normal',
                    fontWeight: 300,
                    lineHeight: 'normal',
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

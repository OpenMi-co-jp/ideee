import React from 'react'
import { Box, Title, Text, Paper, Avatar, Flex, Loader } from '@mantine/core'
import { useGetDeployedIdeasQuery } from '@/lib/generated/client'

const GetDeployedIdeas = () => {
  const { loading, data } = useGetDeployedIdeasQuery()
  if (loading) return <Loader color="yellow" />;
  const DeployedIdeas = data?.deployedIdeas
  return (
    <>
      <Box
        style={{
          borderRadius: '40px',
          border: '3px solid #ED3C3C',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <Title
          style={{
            color: '#9E9595',
            fontSize: '28px',
            marginTop: '24px',
            marginLeft: '80px',
            marginBottom: '15px',
          }}
        >
          実現したアイデア
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
          {DeployedIdeas?.map((DeployedIdea) => {
            return (
              <Paper
                key={DeployedIdea.id}
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
                  {DeployedIdea.name}
                </Text>
                <Avatar
                  radius="xl"
                  size={24}
                  src={DeployedIdea.user.icon}
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

export default GetDeployedIdeas

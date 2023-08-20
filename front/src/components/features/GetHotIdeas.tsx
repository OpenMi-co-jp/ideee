import { useQuery } from '@apollo/client'
import { getHotIdeas } from './getHotIdeas'
import { Box, Title, Text, Paper, Avatar, Flex } from '@mantine/core'
import { Idea } from '@/types/idea'

const GetHotIdeas = () => {
  const { loading, data } = useQuery(getHotIdeas)
  if (loading) return <Text>loading・・・</Text>
  const Ideas = data.hotIdeas

  return (
    <>
      <Box
        style={{
          borderRadius: '40px',
          border: '3px solid #F2CE0D',
          background: '#FFF',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <Title
          style={{
            color: '#DCCC39',
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
          新しいアイデア
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
          {Ideas.map((idea: Idea) => {
            return (
              <>
                <Paper
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
                    {idea.name}
                  </Text>
                  <Avatar
                    radius="xl"
                    size={24}
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                    style={{
                      marginTop: '25px',
                    }}
                  />
                </Paper>
              </>
            )
          })}
        </Flex>
      </Box>
    </>
  )
}

export default GetHotIdeas

import React from 'react'
import { Box, Title, Badge, Flex } from '@mantine/core'
import { useGetPopularTagsQuery } from '@/lib/generated/client'

const GetPopularTags = () => {
  const { loading, data } = useGetPopularTagsQuery()
  if (loading) return <p>Loading...</p>
  const Tags = data?.popularTags
  return (
    <>
      <Box
        style={{
          borderRadius: '20px',
          border: '3px solid #000',
          margin: '50px 35px 50px 35px',
        }}
      >
        <Title
          style={{
            color: '#ABA096FA',
            fontSize: '28px',
            marginTop: '24px',
            marginLeft: '80px',
            marginBottom: '15px',
          }}
        >
          タグから探す
        </Title>
        <Box
          style={{
            borderRadius: '20px',
            border: '3px solid #A5E4FFD6',
            background: '#FFF',
            margin: '0 60px 50px 60px',
            padding: '15px 80px 15px 80px',
          }}
        >
          <Flex justify="center" align="center" direction="row" wrap="wrap">
            {Tags?.map((tag) => {
              return (
                <Badge
                  key={tag.id}
                  size="xl"
                  radius="sm"
                  variant="filled"
                  style={{
                    margin: '5px 15px 5px 15px',
                    fontSize: '12px',
                  }}
                >
                  {tag.name}
                </Badge>
              )
            })}
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default GetPopularTags

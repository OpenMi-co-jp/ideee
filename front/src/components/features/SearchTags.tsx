import React from 'react'
import { Box, Title, Badge, Flex } from '@mantine/core'

const SearchTags = () => {
  return (
    <>
      <Box
        style={{
          borderRadius: '20px',
          border: '3px solid #000',
          background: '#FFFCFC',
          margin: '50px 35px 50px 35px',
        }}
      >
        <Title
          style={{
            color: '#ABA096FA',
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
          <Flex
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #仕事探し
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #ChatGPT
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #友達
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #靴
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #安心
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #自動生成
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #友達
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #アニメ
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #ホーム
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #年賀状
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #アニメ
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #ゲーム
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #NFT
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #仕事探し
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #NPC
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #ホーム
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #靴
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #釣り
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #自動生成
            </Badge>
            <Badge size="xl" radius="sm" variant="filled"
              style={{
                margin: "5px 15px 5px 15px",
                fontSize: '12px',
              }}>
              #AI
            </Badge>
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default SearchTags

import React from 'react'
import NextImage from 'next/image'
import {
  Title, Text, Button, Image, Box, BackgroundImage
} from '@mantine/core'
import Link from 'next/link'


export const TopVision = () => {
  // TODO: 現在のユーザー数を設定予定
  // TODO: BackgroundImageが横幅いっぱいにならない
  const userNum = 937
  return (
    <Box>
      <BackgroundImage 
        src={'/img/top_vision_image.webp'} 
        style={{
          top: 150,
          maxHeight: '500px',
          zIndex: -300,

          '@media (max-width: 649px)': {
            maxHeight: '250px',
            objectFit: 'cover',
          },
          '@media (max-width: 1000px) and (min-width:650px)': {
            maxHeight: '350px',
          },
        }}
        >
      <Box
        style={{
          width: '400px',
          paddingTop: '150px',
          paddingBottom: '130px',
          textAlign: 'center',

          '@media (max-width: 649px)': {
            width: 'auto',
            paddingTop: '70px',
            paddingBottom: '30px',
          },
          '@media (max-width: 1000px) and (min-width:650px)': {
            paddingTop: '100px',
          },
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexFlow: 'column',
            paddingBottom: '55px',

            '@media (max-width: 649px)': {
              paddingBottom: '40px',
              textShadow:
                '8px 8px 12px white, -8px 8px 12px white, 8px -8px 12px white, -8px -8px 12px white',
            },
            '@media (max-width: 1000px) and (min-width:650px)': {
              paddingBottom: '40px',
            },
          }}
        >
          <Title
            style={{
              color: '#FF862F',
              '@media (max-width: 649px)': {
                fontSize: '26px',
              },
              '@media (max-width: 1000px) and (min-width:650px)': {
                fontSize: '28px',
              },
            }}
          >あなたのアイデアを
          </Title>
          <Title
            style={{
              color: '#FF862F',
              '@media (max-width: 649px)': {
                fontSize: '26px',
              },
              '@media (max-width: 1000px) and (min-width:650px)': {
                fontSize: '28px',
              },
            }}
          >
            エンジニアと盛り上げる
          </Title>
        </Box>
        <Link href="/about">
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'yellow' }}
          >
            IDEEEについて｜⇢
          </Button>
        </Link>
        <Text
          style={{
            paddingTop: '35px',
            color: '#818181',
            fontSize: '20px',
            fontWeight: 700,

            '@media (max-width: 649px)': {
              fontSize: '16px',
            },
            '@media (max-width: 1000px) and (min-width:650px)': {
              fontSize: '18px',
            },
          }}
        >
          現在のユーザー数:{' '}
          <b style={{ color: '#FF862F', fontSize: '2rem' }}>{userNum}</b>人
        </Text>
      </Box>
      </BackgroundImage>
    </Box>
  )
}

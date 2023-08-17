import React from 'react'
import Image from 'next/image'
import { Title, Text, Button } from '@mantine/core'

const MainVisual = () => {
  return (
    <>
      <div>
        <Image
          src={'/img/top_vision_image.webp'}
          alt="top_vision_image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            maxHeight: '500px',
            zIndex: '-300',
            top: '150px',
          }}
          fill
        />
      </div>
      <div
        style={{
          width: '350px',
          paddingTop: '200px',
          paddingBottom: '130px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            paddingBottom: '55px',
          }}
        >
          <Title
            style={{
              color: '#FF862F',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '35px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
            }}
          >
            あなたのアイデアを
          </Title>
          <Title
            style={{
              color: '#FF862F',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '35px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
            }}
          >
            エンジニアと盛り上げる
          </Title>
        </div>
        <Button color="orange">IDEEEについて｜⇢</Button>
        <Text
          fz="md"
          style={{
            paddingTop: '35px',
            color: '#818181',
            fontFamily: 'Inter',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          現在のユーザーの数:937人
        </Text>
      </div>
    </>
  )
}

export default MainVisual

import React from 'react'
import Image from 'next/image'
import { createStyles, Title, Text, Button } from '@mantine/core'

const useStyles = createStyles(() => ({
  topVision: {
    maxHeight: '500px',
    zIndex: -300,

    '@media (max-width: 649px)': {
      maxHeight: '250px',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      maxHeight: '350px',
    },
  },
}))

const TopVision = () => {
  const { classes } = useStyles()
  return (
    <>
      <Image
        src={'/img/top_vision_image.webp'}
        alt="top_vision_image"
        className={classes.topVision}
        style={{
          top: 150,
        }}
        fill
      />
      <div
        style={{
          width: '400px',
          paddingTop: '150px',
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
            }}
          >
            あなたのアイデアを
          </Title>
          <Title
            style={{
              color: '#FF862F',
              whiteSpace: 'nowrap',
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

export default TopVision

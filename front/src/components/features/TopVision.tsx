import React from 'react'
import Image from 'next/image'
import { createStyles, Title, Text, Button } from '@mantine/core'

const useStyles = createStyles(() => ({
  topVisionImage: {
    maxHeight: '500px',
    zIndex: -300,

    '@media (max-width: 649px)': {
      maxHeight: '250px',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      maxHeight: '350px',
    },
  },

  topVisionInnerWrapper: {
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
  },
  topVisionTopTextWrapper: {
    display: 'flex',
    flexFlow: 'column',
    paddingBottom: '55px',

    '@media (max-width: 649px)': {
      paddingBottom: '40px',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      paddingBottom: '40px',
    },
  },

  topVisionTopText: {
    color: '#FF862F',
    '@media (max-width: 649px)': {
      fontSize: '26px',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      fontSize: '28px',
    },
  },

  topVisionBottomText: {
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
  },
}))

export const TopVision = () => {
  const { classes } = useStyles()
  return (
    <>
      <Image
        src={'/img/top_vision_image.webp'}
        alt="ビジョンを伝える画像"
        className={classes.topVisionImage}
        style={{
          top: 150,
        }}
        fill
      />
      <div className={classes.topVisionInnerWrapper}>
        <div className={classes.topVisionTopTextWrapper}>
          <Title className={classes.topVisionTopText}>あなたのアイデアを</Title>
          <Title className={classes.topVisionTopText}>
            エンジニアと盛り上げる
          </Title>
        </div>
        <Button color="orange">IDEEEについて｜⇢</Button>
        <Text className={classes.topVisionBottomText}>
          現在のユーザーの数:937人
        </Text>
      </div>
    </>
  )
}

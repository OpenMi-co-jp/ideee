import React from 'react'
import Image from 'next/image'
import { createStyles, Title, Text, Button } from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles(() => ({
  topVisionImageBox: {},
  topVisionImage: {
    maxHeight: '500px',
    zIndex: -300,

    '@media (max-width: 649px)': {
      maxHeight: '250px',
      objectFit: 'cover',
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
      textShadow:
        '8px 8px 12px white, -8px 8px 12px white, 8px -8px 12px white, -8px -8px 12px white',
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
  // TODO: 現在のユーザー数を設定予定
  const userNum = 937
  return (
    <>
      <div className={classes.topVisionImageBox}>
        <Image
          src={'/img/top_vision_image.webp'}
          alt="ビジョンを伝える画像"
          className={classes.topVisionImage}
          style={{
            top: 150,
          }}
          fill
        />
      </div>
      <div className={classes.topVisionInnerWrapper}>
        <div className={classes.topVisionTopTextWrapper}>
          <Title className={classes.topVisionTopText}>あなたのアイデアを</Title>
          <Title className={classes.topVisionTopText}>
            エンジニアと盛り上げる
          </Title>
        </div>
        <Link href="/about">
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'yellow' }}
          >
            IDEEEについて｜⇢
          </Button>
        </Link>
        <Text className={classes.topVisionBottomText}>
          現在のユーザー数:{' '}
          <b style={{ color: '#FF862F', fontSize: '2rem' }}>{userNum}</b>人
        </Text>
      </div>
    </>
  )
}

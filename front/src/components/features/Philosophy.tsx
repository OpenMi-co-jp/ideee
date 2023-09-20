import React from 'react'
import Image from 'next/image'
import { createStyles, Box, Text, Title, Divider, Flex } from '@mantine/core'

const useStyles = createStyles(() => ({
  Box: {
    padding: '50px 0',
  },

  Title: {
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '30px',
    letterSpacing: '3px',

    '@media (max-width: 649px)': {
      fontSize: '22px',
      marginBottom: '20px',
    },
  },

  Divider: {
    border: 0,
    borderTopWidth: '0.125rem',
    borderTopColor: '#000000',
    borderTopStyle: 'solid',
    margin: '0 auto',
    paddingBottom: '50px',
    width: '55%',

    '@media (max-width: 649px)': {
      paddingBottom: '20px',
    },
  },

  SubTitle: {
    fontSize: '14px',
    fontWeight: 700,
    paddingBottom: '50px',
    justifyContent: 'space-between',
    width: '80%',
    margin: '0 auto',

    '@media (max-width: 649px)': {
      fontSize: '12px',
    },
  },

  ImageTitle: {
    fontSize: '25px',
    fontWeight: 700,
    zIndex: 500,
    textAlign: 'center',
    paddingBottom: '5px',
    letterSpacing: '3px',
    '@media (max-width: 649px)': {
      fontSize: '15px',
    },
  },

  PeopleImage: {
    margin: '0 auto',
    zIndex: 500,
    marginTop: '16vh',
    '@media (max-width: 649px)': {
      width: 286,
      height: 200,
      marginTop: '10vh',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      width: 357,
      height: 250,
      marginTop: '8vh',
    },
  },

  PeopleLeftImage: {
    width: '500px',
    height: '435px',
    borderRadius: '50%',
    position: 'absolute',
    background: 'rgba(239, 213, 120, 0.49)',
    top: 0,
    left: 0,

    '@media (max-width: 649px)': {
      width: '285px',
      height: '250px',
      left: '-60px',
    },
    '@media (max-width: 1000px) and (min-width:650px)': {
      width: '333px',
      height: '290px',
    },
  },

  PeopleRightImage: {
    width: '500px',
    height: '435px',
    borderRadius: '50%',
    position: 'absolute',
    background: 'rgba(215, 145, 145, 0.50)',
    top: '50px',
    left: '450px',

    '@media (max-width: 649px)': {
      width: '285px',
      height: '250px',
      top: '50px',
      left: '180px',
    },

    '@media (max-width: 1000px) and (min-width:650px)': {
      width: '333px',
      height: '290px',
      top: '50px',
      left: '300px',
    },
  },
}))

export const Philosophy = () => {
  const { classes } = useStyles()
  return (
    <>
      <Box className={classes.Box}>
        <Title className={classes.Title}>
          アイデアをデザインしエンジニアの出会いを盛り上げる
        </Title>
        <Divider className={classes.Divider} />
        <Flex
          align="center"
          direction="row"
          wrap="wrap"
          className={classes.SubTitle}
        >
          <Text>
            <span style={{ color: '#FDB221' }}>I</span>dea
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }}>D</span>esign
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }}>E</span>ngineer
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }}>E</span>ncounter
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }}>E</span>ncourage
          </Text>
        </Flex>
        <Flex style={{ position: 'relative', marginTop: '80px' }}>
          <Flex
            justify="center"
            direction="column"
            wrap="wrap"
            style={{ margin: '-20px auto 0 auto' }}
          >
            <Text className={classes.ImageTitle}>
              あなたの「困ってる」を形に
            </Text>
            <Text className={classes.ImageTitle}>
              コードで社会に貢献してみませんか？
            </Text>
            <Image
              className={classes.PeopleImage}
              src={'/img/bottom_vision_image.webp'}
              alt="コラボレーションイメージ"
              width={430}
              height={300}
            />
          </Flex>
          <div className={classes.PeopleLeftImage} />
          <div className={classes.PeopleRightImage} />
        </Flex>
      </Box>
    </>
  )
}

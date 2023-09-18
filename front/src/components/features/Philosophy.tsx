import React from 'react'
import Image from 'next/image'
import { createStyles, Box, Text, Title, Divider, Flex } from '@mantine/core'

const useStyles = createStyles(() => ({
  Box: {
    padding: '50px 0',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  Title: {
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '30px',
    letterSpacing: '3px',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  Divider: {
    border: 0,
    borderTopWidth: '0.125rem',
    borderTopColor: '#000000',
    borderTopStyle: 'solid',
    margin: '0 auto',
    paddingBottom: '50px',
    width: '55%',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  SubTitle: {
    fontSize: '14px',
    fontWeight: 700,
    paddingBottom: '50px',
    justifyContent: 'space-between',
    width: '50%',
    margin: '0 auto',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  SubTitleInitialCommon: {
    color: '#FDB221',
  },

  ImageWrapper: {
    position: 'relative',
    marginTop: '80px',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  ImageInnerWrapper: {
    margin: '-20px auto 0 auto',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  ImageTitle: {
    fontSize: '25px',
    fontWeight: 700,
    zIndex: 500,
    textAlign: 'center',
    paddingBottom: '5px',
    letterSpacing: '3px',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  PeopleImage: {
    margin: '0 auto',
    zIndex: 500,
    marginTop: '16vh',
    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  PeopleLeftImage: {
    width: '500px',
    height: '435px',
    borderRadius: '50%',
    position: 'absolute',
    background: 'rgba(239, 213, 120, 0.49)',
    top: 0,
    left: 0,

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },

  PeopleRightImage: {
    width: '500px',
    height: '435px',
    borderRadius: '50%',
    position: 'absolute',
    background: 'rgba(215, 145, 145, 0.50)',
    top: '50px',
    left: '450px',

    '@media (max-width: 649px)': {},
    '@media (max-width: 1000px) and (min-width:650px)': {},
  },
}))

const Philosophy = () => {
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
            <span className={classes.SubTitleInitialCommon}>I</span>dea
          </Text>
          <Text>
            <span className={classes.SubTitleInitialCommon}>D</span>esign
          </Text>
          <Text>
            <span className={classes.SubTitleInitialCommon}>E</span>ngineer
          </Text>
          <Text>
            <span className={classes.SubTitleInitialCommon}>E</span>ncounter
          </Text>
          <Text>
            <span className={classes.SubTitleInitialCommon}>E</span>ncourage
          </Text>
        </Flex>
        <Flex className={classes.ImageWrapper}>
          <Flex
            justify="center"
            direction="column"
            wrap="wrap"
            className={classes.ImageInnerWrapper}
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
              alt="bottom_vision_image"
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

export default Philosophy

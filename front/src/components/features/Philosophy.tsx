import NextImage from 'next/image'
import { Box, Text, Title, Divider, Flex, Image } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const Philosophy = () => {
  const smallScreen = useMediaQuery('(max-width: 767px)')
  const mediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 991px)'
  )
  const largeScreen = useMediaQuery('(min-width: 992px)')
  return (
    <>
      <Box py="50px" px="0px">
        <Title
          fz={{ base: 22, md: 32 }}
          ta="center"
          mb={{ base: 20, md: 30 }}
          lts="3px"
        >
          アイデアをデザインしエンジニアの出会いを盛り上げる
        </Title>
        <Divider
          pb={{ base: 20, md: 50 }}
          style={{
            border: 0,
            borderTopWidth: '0.125rem',
            borderTopColor: '#000000',
            borderTopStyle: 'solid',
            margin: '0 auto',
            width: '55%',
          }}
        />
        <Flex
          align="center"
          direction="row"
          wrap="wrap"
          style={{
            paddingBottom: '50px',
            justifyContent: 'space-between',
            width: '80%',
            margin: '0 auto',
          }}
        >
          <Text size="xl" fz={{ base: 16, md: 22 }} fw={700}>
            <span style={{ color: '#FDB221' }}>I</span>dea
          </Text>
          <Text size="xl" fz={{ base: 16, md: 22 }} fw={700}>
            <span style={{ color: '#FDB221' }}>D</span>esign
          </Text>
          <Text size="xl" fz={{ base: 16, md: 22 }} fw={700}>
            <span style={{ color: '#FDB221' }}>E</span>ngineer
          </Text>
          <Text size="xl" fz={{ base: 16, md: 22 }} fw={700}>
            <span style={{ color: '#FDB221' }}>E</span>ncounter
          </Text>
          <Text size="xl" fz={{ base: 16, md: 22 }} fw={700}>
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
            <Text
              fz={{ base: 15, md: 25 }}
              fw={700}
              ta="center"
              pb="5px"
              lts="3px"
              style={{ zIndex: 100 }}
            >
              あなたの「困ってる」を形に
            </Text>
            <Text
              fz={{ base: 15, md: 25 }}
              fw={700}
              ta="center"
              pb="5px"
              lts="3px"
              style={{ zIndex: 100 }}
            >
              コードで社会に貢献してみませんか？
            </Text>
            <Image
              component={NextImage}
              src={'/img/bottom_vision_image.webp'}
              alt="コラボレーションイメージ"
              width={430}
              height={350}
              w={{ base: '286px', sm: '357px', md: '430px' }}
              h={{ base: '200px', sm: '250px', md: '350px' }}
              mt={{ base: '60px', md: '150px' }}
              mx="auto"
              style={{
                zIndex: 100,
              }}
            />
          </Flex>
          <Box
            w={{ base: '220px', sm: '333px', md: '500px' }}
            h={{ base: '170px', sm: '290px', md: '435px' }}
            bg={'rgba(239, 213, 120, 0.49)'}
            style={{
              borderRadius: '50%',
              position: 'absolute',
              left: smallScreen
                ? '37%'
                : mediumScreen
                  ? '35%'
                  : largeScreen
                    ? '25%'
                    : '25%',
              transform: 'translateX(-50%)',
            }}
          />
          <Box
            w={{ base: '220px', sm: '333px', md: '500px' }}
            h={{ base: '170px', sm: '290px', md: '435px' }}
            top={{ base: '30px', sm: '50px' }}
            bg={'rgba(215, 145, 145, 0.50)'}
            style={{
              borderRadius: '50%',
              position: 'absolute',
              left: smallScreen
                ? '63%'
                : mediumScreen
                  ? '65%'
                  : largeScreen
                    ? '75%'
                    : '75%',
              transform: 'translateX(-50%)',
            }}
          />
        </Flex>
      </Box>
    </>
  )
}
